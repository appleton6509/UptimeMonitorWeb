import { ShadowBox } from "components/Generic/Design/ShadowBox";
import React, { Component } from "react"
import { Container, Row, Col, Spinner, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Button } from "reactstrap";
import { DeleteAccountButton } from "./components/DeleteAccountButton";
import { AuthContext } from 'components/Authorization/AuthContext'
export class Profile extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            username: ""
        }
    }

    componentDidMount() {
        const authContext = this.context;
        const username = authContext.getUserName();
        if (username)
            this.setState({ username: username })
    }

    onClickChangePassword = () => {
        this.props.history.push("/Profile/ChangePassword");
    }

    render() {
        const { username } = this.state;
        return (
            <Container>
                <Row className="justify-content-center" >
                    <Col md="6" >
                        <ShadowBox>
                            <h1 className="mt-3 mb-3 text-center">
                                Profile
                            </h1>
                            <br />
                            <Label>Email</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-envelope"></i> </InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" id="username" name="username" formNoValidate disabled required={false} value={username} onChange={e => { this.setState({ username: e.target.value }) }} placeholder="email address" />
                            </InputGroup>
                            <div className="text-center mt-3">
                            <Button type="button" onClick={this.onClickChangePassword} className="m-2" color="info">Change Password </Button>
                            <Button type="button" onClick={this.onClickChangePassword} className="m-2" color="info">Change Email </Button>
                            <br/><br/>
                            <DeleteAccountButton history={this.props.history} />
                            </div>
                        </ShadowBox>
                    </Col>
                </Row>
            </Container>
        );
    }
}