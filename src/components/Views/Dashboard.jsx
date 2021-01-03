import React, { Component } from 'react';
import { CardTitle, Card, Container, Row, Col, CardBody } from 'reactstrap';

export class Dashboard extends Component {
    static displayName = Dashboard.name;
    
    render() {
        return (
            <Container>
                <Row >
                    <Col lg="4">
                        <div className="shadow mt-4">
                            <Card>
                                <CardTitle className="text-center">Online</CardTitle>
                                <CardBody>

                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col lg="4">
                        <div className="shadow mt-4">
                            <Card>
                                <CardTitle className="text-center">Offline</CardTitle>
                                <CardBody>

                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row>
                <Col lg="6" >
                        <div className="shadow mt-4">
                            <Card>
                                <CardTitle className="text-center">Top 10 Reliable</CardTitle>
                                <CardBody>

                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col lg="6" >
                        <div className="shadow mt-4">
                            <Card>
                                <CardTitle className="text-center">Bottom 10 Reliable</CardTitle>
                                <CardBody>

                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}