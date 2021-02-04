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
                <Row className="justify-content-center" >
                    <Col md="6" >
                        <ShadowBox>
                        <br/>
                            <LoginForm />
                        </ShadowBox>
                    </Col>
                </Row>
            </Container>
        )
    }

}