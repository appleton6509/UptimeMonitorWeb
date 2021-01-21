
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
            cssTransitionClass: "box"
        }

    }
    static displayName = Home.name;

    onClick = (url) => {
        this.setState({ url: url, cssTransitionClass: "box-transition" })
    }

    render() {
        const { cssTransitionClass, url } = this.state;
        return (
            <Container>
                <div className={cssTransitionClass}>
                    <ShadowBox>
                        <h1 className="text-center mb-5">Is your site running right now?</h1>
                        <CheckSiteForm className="mb-3" onClick={this.onClick} />
                        {url !== "" ? <div className="contain"><CheckWebResultForm url={url} /></div> : <div></div>}
                    </ShadowBox>
                </div>
            </Container>
        );
    }
}