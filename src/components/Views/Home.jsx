
import { ShadowBox } from 'components/Design/ShadowBox';
import { CheckSiteForm } from 'components/Forms/CheckSiteForm';
import { CheckWebResultForm } from 'components/Forms/CheckWebResultForm';
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import './Home.css'

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            cssTransitionClass: "box",
            hideClass: ""
        }

    }
    static displayName = Home.name;

    onClick = (url) => {
        this.setState({ url: url, cssTransitionClass: "box-transition" })
    }

    render() {
        const { cssTransitionClass, url, hideClass } = this.state;
        return (
            <Container>
                <div className={cssTransitionClass}>
                        <CheckSiteForm onClick={this.onClick} />
                </div>
                {url !== "" ?
                    <div className="resultBox">
                        <CheckWebResultForm onClick="" url={url} />
                    </div>
                    : <div></div>}
            </Container>
        );
    }
}