import { Component, Fragment, React } from 'react'
import { Spinner, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AuthContext } from 'components/Authorization/AuthContext';
import { AuthService } from 'components/Services/authservice';
import { toast } from 'react-toastify';

export class DeleteAccountButton extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            showModal: false
        }
    }
    onClickDeleteAccount = () => {
        const context = this.context;
        const id = context.getUserId();
        AuthService.DeleteAccount(id)
            .then(() => { context.logout() })
            .catch(err => { toast.error(err) });
    }
    render() {
        return (
            <Fragment>
                <a color="danger" id="btnDelete" style={{ cursor: "pointer", color: "red" }} onClick={(e) => { this.setState({ showModal: true }) }} className="m-4">
                    Delete Account</a>
                <Modal isOpen={this.state.showModal} >
                    <ModalHeader className="justify-content-center">
                        Delete Account?
                    </ModalHeader>
                    <ModalBody>You are about to delete your account. This action is irreversible and all data will be deleted.
                    Are you sure you wish to delete your account now?</ModalBody>
                    <ModalFooter>
                        <Button onClick={this.onClickDeleteAccount}>Yes</Button>
                        <Button onClick={(e) => { this.setState({ showModal: false }) }} >Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}