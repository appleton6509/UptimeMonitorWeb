import { ShadowBox } from "components/Generic/Design/ShadowBox";
import { EditUserForm } from "components/Views/Accounts/components/EditUserForm";
import React, { Component } from "react"
import { Container, Row,Col } from "reactstrap";

export class Profile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
        <Container>
                <Row className="justify-content-center" >
                    <Col md="6" >
                    <h1 className="mt-3 mb-3 text-center">
                            Personal Profile
                        </h1>
                        <br/>
                        <ShadowBox>
                        <EditUserForm/>
                        </ShadowBox>
                    </Col>
                </Row>
            </Container>
            );
    }
}