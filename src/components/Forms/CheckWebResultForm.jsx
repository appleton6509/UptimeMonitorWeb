import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, CardBody, CardTitle } from 'reactstrap';
import LoadingSpinner from 'components/Design/LoadingSpinner';
import './CheckWebResultForm.css'
export class CheckWebResultForm extends Component {
    static propTypes = {
        url: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isReachable: false,
            isVisible: false
        }
    }
    componentDidMount() {
        this.fetchStatus();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.url !== this.props.url) {
            this.setState({ isLoading: true })
            this.fetchStatus();
        }
    }

    fetchStatus = async () => {
        const { url } = this.props;
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
        this.setState({ isReachable: reachable, isVisible: true, isLoading: false })
    }


    render() {
        const { isReachable, isVisible, isLoading } = this.state;
        const { url } = this.props;
        if (isVisible && !isLoading) {
            if (isReachable) {
                return (
                    <div>
                    <h1>Great! you&apos;re online!</h1>
                        <Card className="style-card">
                            <CardTitle className="style-title style-online">
                                <i>UP</i>
                            </CardTitle>
                            <CardBody className="style-body">
                                <p>{url}</p>
                                <br /><Button color="success">Start Monitoring</Button>
                            </CardBody>
                        </Card>
                    </div>
                );
            }
            if (!isReachable) {
                return (
                    <div>
                    <h1>Uh-Oh.</h1>
                        <Card className="style-card">
                            <CardTitle className="style-title style-offline">
                                <i>DOWN</i>
                            </CardTitle>
                            <CardBody className="style-body">
                                <p>{url}</p>
                                <br /><Button color="danger">Start Monitoring</Button>
                            </CardBody>
                        </Card>
                    </div>
                );
            }
        } else {
            return (<LoadingSpinner></LoadingSpinner>);
        }

    }
}