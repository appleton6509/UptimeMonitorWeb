import { ShadowBox } from 'components/Generic/Design/ShadowBox';
import {Component, React} from 'react'
import { Col, Container, Row } from 'reactstrap';

export class ConfirmEmailFailure extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container>
                <Row className="justify-content-center" >
                    <Col md="5" className="text-center">
                        <ShadowBox>
                        <i className="fa fa-window-close fa-5x" style={{color: "red"}}></i>
                        <h1>Uh-oh!</h1>
                        <p>
                        Unable to confirm your account, please try again.
                        </p>
                        <p>If this issue persists please contact technical support.</p>
                        </ShadowBox>
                    </Col>
                </Row>
            </Container>
        );
    }
}