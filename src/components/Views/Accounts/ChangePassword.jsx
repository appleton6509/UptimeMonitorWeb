import { ShadowBox } from 'components/Generic/Design/ShadowBox';
import { Component, React } from 'react'
import { Col, Container, Row } from 'reactstrap';
import { ChangePasswordForm } from './components/ChangePasswordForm';

export class ChangePassword extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md="6">
                        <ShadowBox>
                            <ChangePasswordForm history={this.props.history}/>
                        </ShadowBox>
                    </Col>
                </Row>
            </Container>
        );
    }
}