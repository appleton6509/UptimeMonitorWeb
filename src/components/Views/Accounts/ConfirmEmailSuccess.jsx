import LoadingSpinner from 'components/Generic/Design/LoadingSpinner';
import { ShadowBox } from 'components/Generic/Design/ShadowBox';
import {Component, React} from 'react'
import { Col, Container, Row } from 'reactstrap';
export class ConfirmEmailSuccess extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        setTimeout(()=> {
            window.location.replace("/SignIn");
        },3000)
    }
    render() {
        return(
            <Container>
                <Row className="justify-content-center" >
                    <Col md="5" className="text-center">
                        <ShadowBox>
                        <i className="fa fa-check-circle fa-5x" style={{color: "forestgreen"}}></i>
                        <h1>Email confirmed!</h1>
                             redirecting to login page...
                            <LoadingSpinner />
                        </ShadowBox>
                    </Col>
                </Row>
            </Container>
        );
    }
}