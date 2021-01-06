import React, { Component } from 'react';
import { CardTitle, Card, Container, Row, Col, CardBody } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import { OfflineTable } from 'components/Tables/OfflineTable';
import OnlineDoughnutChart from 'components/Charts/OnlineDoughnutChart';
import OfflineDoughnutChart from 'components/Charts/OfflineDoughnutChart';

export class Dashboard extends Component {
    static displayName = Dashboard.name;
    static contextType = AuthContext;
    
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.context.checkauthorization();
    }

    render() {

        return (
            <Container>
                <Row>
                    <Col lg="4">
                        <div className="shadow mt-4">
                            <Card>
                                <CardBody>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col lg="4">
                        <div className="shadow mt-4">
                            <Card>
                                <CardBody>
                                    <OnlineDoughnutChart/>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col lg="4">
                        <div className="shadow mt-4">
                            <Card>
                                <CardBody>
                                    <OfflineDoughnutChart/>
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
                                <OfflineTable />
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