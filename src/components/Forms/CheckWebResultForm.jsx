import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, CardBody, CardTitle } from 'reactstrap';
import LoadingSpinner from 'components/Design/LoadingSpinner';
import './CheckWebResultForm.css'
export class CheckWebResultForm extends Component {
    static propTypes = {
        url: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func
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
        const { isReachable, isVisible, isLoading, className } = this.state;
        const { url } = this.props;
        const cardClass = "style-card " + {className}
        if (isVisible && !isLoading) {
            if (isReachable) {
                return (
                    <div>
                        <Card className={cardClass} >
                            <CardTitle className="style-title style-online">
                                <h1>Online</h1>
                                <h4>{url}</h4>
                            </CardTitle>
                            <CardBody className="style-body">
                            <h3>Great!</h3>
                                <p>
                                     your website is online. start monitoring today to keep it that way!
                                </p><Button color="primary" onClick={this.props.onClick}>Start Monitoring</Button>
                            </CardBody>
                        </Card>
                        </div>
                );
            }
            if (!isReachable) {
                return (
                        <Card className="style-card">
                            <CardTitle className="style-title style-offline">
                                <h1>Offline</h1>
                            </CardTitle>
                            <CardBody className="style-body">
                            <h3>Uh-oh!</h3>
                                <p>
                                     your website is offline. start monitoring today to keep it that way!
                                </p><Button color="primary" onClick={this.props.onClick}>Start Monitoring</Button>
                            </CardBody>
                        </Card>
                );
            }
        } else {
            return (<LoadingSpinner></LoadingSpinner>);
        }

    }
}