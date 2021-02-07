import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, CardBody, CardTitle } from 'reactstrap';
import LoadingSpinner from 'components/Generic/Design/LoadingSpinner';
import './WebTestResult.css'
import { FetchService } from 'components/Services/fetchservice';
import { toast } from 'react-toastify';
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
        const rawUrl = this.props.url.toLowerCase();
        const url = 'EndPoints/OnlineStatus/' + encodeURIComponent(rawUrl);
        let isSuccess = true;
        await FetchService.fetchNow(url,"GET").then(res => {
            if (res.ok)
                return res.text();
        }).then(body => {
             isSuccess = (body === 'true') ? true : false
        })
        .catch(err => {
                isSuccess = false;
                toast.error(err);
        })
        this.setState({ isReachable: isSuccess, isVisible: true, isLoading: false })
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
            message = "your website is offline. start monitoring today to keep it always up!";
            cardTitleClasses += "style-offline"
        }
        return (
            <div>
                <Card className={cardClass} >
                    <CardTitle className={cardTitleClasses}>
                        <h1>{title}</h1>
                        <h6>{url}</h6>
                    </CardTitle>
                    <CardBody className="style-body">
                        <h3>{messageTitle}</h3>
                        <br/>
                        {isLoading ? <LoadingSpinner height="5rem"></LoadingSpinner> : ""}
                            {message}
                        <br/><br/>
                        {isLoading ? "" : <Button color="primary" onClick={this.props.onClick}>Start Monitoring</Button> }
                    </CardBody>
                </Card>
            </div>
        );
    }
}