import { CheckSiteForm } from '../Forms/CheckSiteForm';
import { WebTestResult } from '../Design/WebTestResult';
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import './Home.css'

export class Home extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            cssTransitionClass: "box",
            hideClass: ""
        }

    }
    static displayName = Home.name;

    componentDidMount() {
        let context = this.context;
        if(context.user.isAuthenticated)
            window.location.replace("/Performance")
    }
    onClick = (url) => {
        this.setState({ url: url, cssTransitionClass: "box-transition" })
    }
    onClick_StartMonitoring = () => {
        window.location.replace("/SignUp")
    }

    render() {
        const { cssTransitionClass, url, hideClass } = this.state;
        return (
            <Container>
                {url !== "" ?
                    <div className="resultBox">
                        <WebTestResult onClick={this.onClick_StartMonitoring} url={url} />
                    </div>
                    : <div></div>}
                <div className={cssTransitionClass}>
                    <CheckSiteForm onClick={this.onClick} />
                </div>

            </Container>
        );
    }
}