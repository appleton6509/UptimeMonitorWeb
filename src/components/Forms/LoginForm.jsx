import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';

export class LoginForm extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isLoading: false
        }
    }
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        let authContext = this.context;
        await authContext.login(event.target.username.value, event.target.password.value)
            .then(result => {
                result.success ? window.location.replace("/Dashboard") : this.setState({ isLoading: false });
            });
    }

    render() {
        return (
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
                    <Button type="submit" id="btnSubmit" className="mb-4">
                        <div hidden={this.state.isLoading}> OK </div>
                        <Spinner hidden={!this.state.isLoading} as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}