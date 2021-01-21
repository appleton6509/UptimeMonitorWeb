import { FetchService } from 'components/Services/fetchservice';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card,Button, CardBody, CardTitle } from 'reactstrap';
import LoadingSpinner from 'components/Design/LoadingSpinner';

export class CheckWebResultForm extends Component {
    static propTypes = {
        url: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            result: "",
            isReachable: false,
            isVisible: false
        }
    }
    componentDidMount() {
        this.fetchStatus();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.url !== this.props.url) {
            this.fetchStatus();
        }
    }

    fetchStatus = async () => {
        const {url} = this.props;
        if (url === "")
            return;
        let reachable = await fetch("http://" + url, {
            mode: 'no-cors',
        method: 'GET'
        })
            .then(res => {
                return true
            }).catch(error => {
                return false
            })
        if (Number(status) >= 200 && Number(status) <= 499)
            this.setState({ isReachable: reachable });
        else
            this.setState({ isReachable: reachable });
        this.setState({isVisible: true})
    }

    render() {
        const { result,isReachable, isVisible } = this.state;
        const { url } = this.props;
        if (isVisible) {
            return (
                <Card style={{maxWidth: "10vw"}}>
                    <CardTitle>{isReachable ? "UP" : "DOWN"}</CardTitle>
                    <CardBody>
                       {url}
                    <Button> Submit</Button>
                    </CardBody>
                </Card>
            );
        } else {
            return (<LoadingSpinner></LoadingSpinner>);
        }

    }
}