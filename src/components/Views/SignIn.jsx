import React, { Component } from 'react';
import { Card, Container, Row, Col, CardBody } from 'reactstrap';
import { LoginForm } from 'components/Forms/LoginForm';
import '../Settings/theme.css';
import { ShadowBox } from 'components/Design/ShadowBox';

export class SignIn extends Component {
    static displayName = SignIn.name;
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1 className="mt-3 mb-3 text-center">
                            Lets get you LOGGED IN.
                        </h1>
                    </Col>
                </Row>
                <Row className="justify-content-center" >
                    <Col md="6" >
                        <ShadowBox>
                            <LoginForm />
                        </ShadowBox>
                    </Col>
                </Row>
            </Container>
        )
    }

}