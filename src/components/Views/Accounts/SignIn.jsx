import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { LoginForm } from 'components/Views/Accounts/components/LoginForm';
import { ShadowBox } from 'components/Generic/Design/ShadowBox';
import 'components/Settings/theme.css';

export class SignIn extends Component {
    static displayName = SignIn.name;
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <Row className="justify-content-center" >
                    <Col md="6">
                        <ShadowBox style={{minHeight: "40vh"}} >
                        <h1 className="text-center">Login</h1>
                        <br/>
                            <LoginForm />
                        </ShadowBox>
                    </Col>
                </Row>
            </Container>
        )
    }

}