import { type } from 'jquery';
import React,{Component} from 'react';
import { toast } from 'react-toastify';
import { Button,Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Spinner } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';

export class EditUserForm extends Component {
    static contextType = AuthContext;
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            username: "",
            password: "",
            newpassword: "",
            confirmnewpassword:""
        }
    }
    componentDidMount() {
        const authContext = this.context;
        const username = authContext.getUserName();
        if (username)
            this.setState({username: username})
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const authContext = this.context;
        const password = event.target.password.value;
        const newPassword = event.target.newpassword.value;
        const confirmnewPassword = event.target.confirmnewpassword.value;
        const validUser = this.validateUserName(event.target.username.value);
        const validPassword = this.validatePasswords(newPassword, confirmnewPassword);
        
        if (!validUser || !validPassword)
            return; 

        this.setState({isLoading: true});
         await authContext.updateLogin(validUser,password, newPassword).then(result => {
            if (result.success) 
                toast.success("Updated");
            else 
                toast.error(result.error);
        });
        this.setState({isLoading: false});
    }
    validatePasswords = (password, confirmpassword) => {
        if (password === confirmpassword) {
            toast.info("passwords match")
            return true;
        } else
        {
            toast.error("passwords dont match")
            return false;
        }
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
        const {username,newpassword,password, confirmnewpassword } = this.state;
        return(
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label>Email</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-envelope"></i> </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="username" name="username" formNoValidate required={false} value={username} onChange={e => {this.setState({username: e.target.value})}} placeholder="email address" />
                    </InputGroup>
              </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-key"></i> </InputGroupText>
                        </InputGroupAddon>
                    <Input type="password" id="password" name="password" formNoValidate required={false} value={password} onChange={e => {this.setState({password: e.target.value})}} placeholder="existing password" />
               </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label>New Password</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-key"></i> </InputGroupText>
                        </InputGroupAddon>
                    <Input type="password" id="newpassword" name="newpassword" formNoValidate required={false} value={newpassword} onChange={e => {this.setState({newpassword: e.target.value})}} placeholder="new password" />
               </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label>Confirm New Password</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-key"></i> </InputGroupText>
                        </InputGroupAddon>
                    <Input type="password" id="confirmnewpassword" name="confirmnewpassword" formNoValidate required={false} value={confirmnewpassword} onChange={e => {this.setState({confirmnewpassword: e.target.value})}} placeholder="confirm new password" />
               </InputGroup>
                </FormGroup>
                <FormGroup className="text-center">
                <Button type="submit" color="info" id="btnSubmit" className="m-4">
                        <div hidden={this.state.isLoading}> Update </div>
                        <Spinner hidden={!this.state.isLoading} as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    </Button>
                    <Button type="submit" color="danger" id="btnDelete" className="m-4">
                        <div hidden={this.state.isLoading}> Delete Account </div>
                        <Spinner hidden={!this.state.isLoading} as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}