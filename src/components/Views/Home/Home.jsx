import { CheckSiteForm } from './Component/CheckSiteForm';
import { WebTestResult } from './Component/WebTestResult';
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { AuthContext } from '../../Authorization/AuthContext';
import './Home.css'

export class Home extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            url: ""
        }

    }
    static displayName = Home.name;

    componentDidMount() {
        let context = this.context;
        if(context.user.isAuthenticated)
            window.location.replace("/Performance")
    }
    onClick = (url) => {
        this.setState({ url: url})
    }
    onClick_StartMonitoring = () => {
        window.location.replace("/SignUp")
    }

    render() {
        const { url } = this.state;
        if (url!== "") 
            return (
                <Container>
                    <div className="resultBox">
                        <WebTestResult onClick={this.onClick_StartMonitoring} url={url} />
                    </div>
                </Container>
            );
        else 
            return(
            <Container>
                <div className="box">
                    <CheckSiteForm onClick={this.onClick} />
                </div>
            </Container>
            );
    }
}