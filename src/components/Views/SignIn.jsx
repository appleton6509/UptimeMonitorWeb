import React, { Component } from 'react';
import { Card, Button, Container, Row, Col, CardBody, Form, 
    FormGroup, Label, Input, Spinner} from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Authorization/AuthContext';

export class SignIn extends Component {
    static displayName = SignIn.name;
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({isLoading: true});
        let authContext = this.context;
        await authContext.login(event.target.username.value,event.target.password.value);
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
                        <Card className="shadow mt-4">
                            <CardBody>
                                <Form onSubmit={this.onSubmit}>
                                    <FormGroup>
                                        <Label>Email / UserName</Label>
                                        <Input type="text" id="username" name="username" formNoValidate required={false} placeholder="email address" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Password</Label>
                                        <Input type="password" id="password" name="password" formNoValidate required={false} placeholder="strong password goes here" />
                                    </FormGroup>
                                    <FormGroup className="text-center">
                                    <Button  type="submit" id="btnSubmit" className="mb-4">
                                        <div hidden={this.state.isLoading}> OK </div>
                                        <Spinner hidden={!this.state.isLoading} as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

}