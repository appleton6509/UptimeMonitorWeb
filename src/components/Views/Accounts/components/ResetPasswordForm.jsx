import { AuthService } from 'components/Services/authservice';
import validator from 'components/Utilities/validator';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Spinner } from 'reactstrap';
import { AuthContext } from 'components/Authorization/AuthContext';

export class ResetPasswordForm extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email:"",
            id:"",
            token:""
        }
    }
    componentDidMount() {
        var url = new URLSearchParams(window.location.search);
        let email = url.get("email");
        let id = url.get("id");
        let token = url.get("token");
        this.setState({email: email, id: id, token:token})
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const {id, token} = this.state;
        let password = e.target.password.value
        let confirmpassword = e.target.confirmpassword.value
        let isValid = this.validatePasswords(password,confirmpassword)
        if (!isValid) 
            return toast.error("passwords dont match");
        
        this.setState({ isLoading: true });

        let isSuccess = await AuthService.ResetPassword(id,token,password)
        .then(x=> {return true})
        .catch(err=>{
            toast.error(err)
            return false;
        });
        this.setState({ isLoading: false });

        if (isSuccess) {
            toast.success("Password successfully reset. You will now be redirected.");
            setTimeout(()=>{window.location.replace("/SignIn")},3000)
        }
    }
    validatePasswords = (password, confirmpassword) => {
        let isValid = validator.passwordsMatch(password,confirmpassword)
        if (isValid) 
            return true;
        return false;
        
    }
    render() {
        const { email } = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label>Email</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-envelope"></i> </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="email" name="email" disabled autoComplete="username" formNoValidate required={false} value={email} />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-key"></i> </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="password" name="password" formNoValidate autoComplete="new-password" required={false} placeholder="new password" />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label>Confirm Password</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-key"></i> </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="confirmpassword" name="confirmpassword" autoComplete="new-password" formNoValidate required={false} placeholder="confirm new password" />
                    </InputGroup>
                </FormGroup>
                <FormGroup className="text-center">
                    <Button type="submit" color="info" id="btnSubmit">
                        <div hidden={this.state.isLoading}> Reset </div>
                        <Spinner hidden={!this.state.isLoading} as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}