import { AuthService } from 'components/Services/authservice';
import validator from 'components/Utilities/validator';
import { Component, React } from 'react'
import { toast } from 'react-toastify';
import { Form, FormGroup, InputGroup, Input, InputGroupAddon, Button, InputGroupText, Label, Spinner } from 'reactstrap';

export class ForgotPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitting: false
        }
    }
    onSubmit = async (e) => {
        e.preventDefault();
        let email = e.target.email.value
        let isValid = validator.isValidEmail(email);
        if (!isValid) {
            toast.error("Invalid email address");
            return;
        }
        this.setState({ isSubmitting: true })
        await AuthService.ForgotPassword(email);
        toast.success("A link to reset your password has been sent to the email address provided.");
        this.setState({ isSubmitting: false })
    }
    render() {
        const { isSubmitting } = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label>Email</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input id="email" name="email" formNoValidate required={false} type="text" placeholder="some@email.com"></Input>
                    </InputGroup>
                </FormGroup>
                <div className="text-center">
                    <br />
                    <Button type="submit" color="info">
                        <div hidden={isSubmitting}>Submit</div>
                        <Spinner hidden={!isSubmitting} as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    </Button>
                </div>
            </Form>
        );
    }
}