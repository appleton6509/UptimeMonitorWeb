import React, { PureComponent } from 'react';
import { Card, Container, Row, Col, CardBody } from 'reactstrap';
import { CreateUserForm } from '../Forms/CreateUserForm';
import '../Settings/theme.css';
import { ShadowBox } from 'components/Design/ShadowBox';

export class SignUp extends PureComponent {
    static displayName = SignUp.name;

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <Row className="justify-content-center" >
                    <Col md="6" >
                        <ShadowBox>
                        <h1 className="mt-3 mb-3 text-center">
                            Create a <i>FREE</i> account
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