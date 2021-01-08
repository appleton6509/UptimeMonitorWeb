import React,{Component} from 'react';
import { Button,Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';

export class CreateLoginForm extends Component {
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
        const username = event.target.username.value;
        const password = event.target.password.value;
        this.setState({isLoading: true});

         await authContext.createLogin(username,password).then(result => {
            if (result.success) 
                 authContext.login(username,password).then(result2 => {
                    if (result2.success)  
                        window.location.replace("/Dashboard");
                });
        });
         setTimeout(()=> {this.setState({isLoading: false});},250);
    }
    render() {
        return(
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