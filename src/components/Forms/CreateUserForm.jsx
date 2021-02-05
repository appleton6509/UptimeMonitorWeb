import validator from 'components/Utilities/validator';
import React,{Component} from 'react';
import { toast } from 'react-toastify';
import { Button,Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Spinner } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';

export class CreateUserForm extends Component {
    static contextType = AuthContext;
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            isLoading: false
        }
    }
    onSubmit = async (event) => {
        event.preventDefault();
        const authContext = this.context;
        const password = event.target.password.value;
        const validUser = this.validateUserName(event.target.username.value);
        if (!validUser)
            return; 

        this.setState({isLoading: true});
         await authContext.createLogin(validUser,password).then(result => {
            if (result.success) 
                 authContext.login(validUser,password).then(result2 => {
                    if (result2.success)  
                        window.location.replace("/Dashboard");
                }).catch()
        });
         setTimeout(()=> {this.setState({isLoading: false});},250);
    }
    validateUserName = (username) => {
        let isValidEmail = validator.isValidEmail(username)
        if (isValidEmail)
            return username.toLowerCase();
        else 
            toast.error("Please enter a valid email address");
    }
    render() {
        return(
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label>Email</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-envelope"></i> </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="username" name="username" formNoValidate required={false} placeholder="email address" />
                    </InputGroup>
              </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-key"></i> </InputGroupText>
                        </InputGroupAddon>
                    <Input type="password" id="password" name="password" formNoValidate required={false} placeholder="strong password goes here" />
               </InputGroup>
                </FormGroup>
                <FormGroup className="text-center">
                <br/>
                    <Button type="submit" color="info" id="btnSubmit" className="mb-4">
                        <div hidden={this.state.isLoading}>Submit&nbsp;<i className="fa fa-send"></i></div>
                        <Spinner hidden={!this.state.isLoading} as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}