import React, { PureComponent } from 'react';
import { Card, Container, Row, Col, CardBody } from 'reactstrap';
import { CreateUserForm } from 'components/Views/Accounts/components/CreateUserForm';
import 'components/Settings/theme.css';
import { ShadowBox } from 'components/Generic/Design/ShadowBox';

export class SignUp extends PureComponent {
    static displayName = SignUp.name;

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md="6">
                        <ShadowBox>
                        <h1 className="text-center">
                            Create a <i><u>Free</u></i> account
                        </h1>
                        <br/>
                            <CreateUserForm />
                        </ShadowBox>
                    </Col>
                </Row>
            </Container>
        )
    }
}