import { ShadowBox } from 'components/Design/ShadowBox';
import { Component, React } from 'react'
import { Button, Col, Container, NavLink, Row, UncontrolledPopover } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import { AuthConsumer } from '../Authorization/AuthProvider';
import { Link } from 'react-router-dom';

export class ProfileNavLink extends Component {
    static contextType = AuthContext
    constructor(props) {
        super(props);

    }
    render() {
        const { target } = this.props
        return (
            <UncontrolledPopover target={target} trigger="focus" placement="bottom">
                <ShadowBox>
                    <Container>
                        <Row>
                            <Col>
                                <div className="text-center">
                                    <i className="fa fa-user-circle fa-3x" style={{ fontSize: "6rem" }}></i>
                                </div>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <AuthConsumer>
                                    {(auth) => {
                                        return (<a>{auth.user.name}</a>);
                                    }}
                                </AuthConsumer>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <NavLink tag={Link} to="/Profile" style={{ float: "left" }}>Profile</NavLink>
                                <AuthConsumer>
                                    {(auth) => {
                                        return (<NavLink tag={Link} style={{ float: "right" }} onClick={auth.logout}>Logout</NavLink>);
                                    }}
                                </AuthConsumer>
                            </Col>
                        </Row>
                    </Container>
                </ShadowBox>
            </UncontrolledPopover>
        );
    }
}