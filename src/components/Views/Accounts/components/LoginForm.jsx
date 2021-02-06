import validator from 'components/Utilities/validator';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Spinner } from 'reactstrap';
import { AuthContext } from 'components/Authorization/AuthContext';

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
        let user = event.target.username.value;
        const validUser = this.validateUserName(event.target.username.value);
        if (!validUser)
            return; 
        this.setState({ isLoading: true });
        await authContext.login(user.toLowerCase(), event.target.password.value)
            .then(result => {
                result.success ? window.location.replace("/Performance") : this.setState({ isLoading: false });
            });
    }

    validateUserName = (username) => {
        let isValid = validator.isValidEmail(username)
        if (isValid)
            return true
        else {
            toast.error("Please enter a valid email address");
            return false;
        }
    }
    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label>Email </Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="username" name="username" autoComplete="username" formNoValidate required={false} placeholder="email address" />
                 </InputGroup>
               </FormGroup>
                <FormGroup className="mb-0">
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-key"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="password" name="password" autoComplete="current-password" formNoValidate required={false} placeholder="strong password goes here" />
                </InputGroup>
             </FormGroup>
             <Link to="/ForgotPassword" className="float-right" >Forgot Password?</Link>
                <FormGroup className="text-center">
                <br/>
                    <Button type="submit" color="info" id="btnSubmit" >
                        <div hidden={this.state.isLoading}>&nbsp;Login&nbsp;<i className="fa fa-sign-in"></i></div>
                        <Spinner hidden={!this.state.isLoading} as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}