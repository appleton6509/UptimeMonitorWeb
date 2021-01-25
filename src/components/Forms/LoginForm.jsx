import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Spinner } from 'reactstrap';
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
        let authContext = this.context;
        const validUser = this.validateUserName(event.target.username.value);
        if (!validUser)
            return; 
        this.setState({ isLoading: true });
        await authContext.login(validUser, event.target.password.value)
            .then(result => {
                result.success ? window.location.replace("/Performance") : this.setState({ isLoading: false });
            });
    }

    validateUserName = (username) => {
        let user = username.toLowerCase();
        const validUser = new RegExp("[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?");
        if (validUser.test(user))
            return user;
        else {
            toast.error("Please enter a valid email address");
            return false;
        }
    }
    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label>Email / UserName</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="username" name="username" formNoValidate required={false} placeholder="email address" />
                 </InputGroup>
               </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-key"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="password" name="password" formNoValidate required={false} placeholder="strong password goes here" />
                </InputGroup>
             </FormGroup>
                <FormGroup className="text-center">
                    <Button type="submit" color="info" id="btnSubmit" className="mb-4">
                        <div hidden={this.state.isLoading}> OK </div>
                        <Spinner hidden={!this.state.isLoading} as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}