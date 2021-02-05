import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../Settings/theme.css';
import { ShadowBox } from 'components/Design/ShadowBox';
import { ResetPasswordForm } from 'components/Forms/ResetPasswordForm';

export class ResetPassword extends Component {
    static displayName = ResetPassword.name;
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <Row className="justify-content-center" >
                    <Col md="5" >
                        <ShadowBox>
                        <h2 className="text-center">Reset Password</h2>
                            <ResetPasswordForm/>
                        </ShadowBox>
                    </Col>
                </Row>
            </Container>
        )
    }

}