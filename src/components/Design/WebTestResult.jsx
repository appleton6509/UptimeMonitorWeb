import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, CardBody, CardTitle } from 'reactstrap';
import LoadingSpinner from 'components/Design/LoadingSpinner';
import './WebTestResult.css'
export class WebTestResult extends Component {
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
        const cardClass = "style-card " + { className }
        let title, messageTitle, message;
        let cardTitleClasses = "style-title ";
        if (isLoading) {
            title = "Checking";
            messageTitle = "";
            message = ""
            cardTitleClasses += "style-loading"
        }
        else if (isReachable) {
            title = "Online";
            messageTitle = "Great!";
            message = "your website is online. start monitoring today to keep it that way!";
            cardTitleClasses += "style-online"
        }
        else if (!isReachable) {
            title = "Offline";
            messageTitle = "Uh-oh!";
            message = "your website is offline. start monitoring today to keep it that way!";
            cardTitleClasses += "style-offline"
        }
        return (
            <div>
                <Card className={cardClass} >
                    <CardTitle className={cardTitleClasses}>
                        <h1>{title}</h1>
                        <h4>{url}</h4>
                    </CardTitle>
                    <CardBody className="style-body">
                        <h3>{messageTitle}</h3>
                        <p>
                        {isLoading ? <LoadingSpinner height="5rem"></LoadingSpinner> : ""}
                            {message}
                        </p>
                        {isLoading ? "" : <Button color="primary" onClick={this.props.onClick}>Start Monitoring</Button> }
                    </CardBody>
                </Card>
            </div>
        );
    }
}