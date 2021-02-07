import { Component, React } from 'react';
import { AuthContext } from 'components/Authorization/AuthContext';
import { AuthService } from 'components/Services/authservice';
import { toast } from 'react-toastify';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label } from 'reactstrap';
import { Route } from 'react-router';

export class ChangePasswordForm extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            newPassword: "",
            confirmNewPassword: "",
        }
    }
    componentDidMount() {
        const authContext = this.context;
        const email = authContext.getUserName();
        this.setState({ email: email });
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const { email } = this.state
        const password = event.target.password.value;
        const newPassword = event.target.newpassword.value;
        const confirmnewPassword = event.target.confirmnewpassword.value;
        const validPassword = this.validatePasswords(newPassword, confirmnewPassword);
        if (!password || newPassword || confirmnewPassword) {
            toast.error("Password field(s) must not be empty")
            return;
        }
        if (!validPassword) {
            toast.error("Passwords do not match")
            return;
        }

        this.setState({ isLoading: true });
        await AuthService.ChangePassword(email, password, newPassword)
            .then(() => { toast.success("Password has been updated.") })
            .catch(err => {
                toast.error(err)
            });
        this.setState({ isLoading: false });
    }
    validatePasswords = (password, confirmpassword) => {
        if (password === confirmpassword) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        const { password, newPassword, confirmNewPassword, email } = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <InputGroup>
                        <Input type="email" id="username" name="username" autoComplete="username" hidden={true} formNoValidate disabled required={false} value={email} />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-key"></i> </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="password" name="password" autoComplete="current-password" formNoValidate required={false} value={password} onChange={e => { this.setState({ password: e.target.value }) }} placeholder="existing password" />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label>New Password</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-key"></i> </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="newpassword" name="newpassword" autoComplete="new-password" formNoValidate required={false} value={newPassword} onChange={e => { this.setState({ newPassword: e.target.value }) }} placeholder="new password" />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label>Confirm New Password</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-key"></i> </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="confirmnewpassword" name="confirmnewpassword" autoComplete="new-password" formNoValidate required={false} value={confirmNewPassword} onChange={e => { this.setState({ confirmNewPassword: e.target.value }) }} placeholder="confirm new password" />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <div className="text-center">
                        <Button type="submit" color="info" className="m-2" >Submit</Button>
                        <Button type="button" color="danger" className="m-2" onClick={() => { this.props.history.goBack() }}>Cancel</Button>
                    </div>
                </FormGroup>
            </Form>
        );
    }
}