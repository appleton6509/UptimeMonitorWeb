import React, { Component } from 'react';
import { CardTitle, Card, Container, Row, Col, CardBody } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import { DashboardService } from '../Services/dashboardservice';
import DoughnutChart from '../Charts/DoughnutChart';
import { OfflineTable } from 'components/Tables/OfflineTable';

export class Dashboard extends Component {
    static displayName = Dashboard.name;
    static contextType = AuthContext;
    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            labels: ['Online', 'Offline'],
            title: 'Connected Devices'
        }
    }

    fetchOnlineOfflineData = async () => {
        let on = 0;
        let off = 0;
        return await DashboardService.getOnlineOffline()
            .then(data => {
                data.forEach(element => {
                    // eslint-disable-next-line no-unused-vars
                    const [ip, timedate, reachable] = Object.entries(element);
                    reachable[1] ? on++ : off++;
                });
            })
            .then(() => {
                this.setState({ data: [on, off] })})
            .catch(err => {
                    console.log(err);
            });
    }
    async componentDidMount() {
        this.context.checkauthorization();
        await this.fetchOnlineOfflineData();
    }

    render() {
        const {title,labels} = this.state
        return (
            <Container>
                <Row>
                    <Col lg="6">
                        <div className="shadow mt-4">
                            <Card>
                                <CardBody>
                                    <DoughnutChart data={this.state.data} title={title} labels={labels}/>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col lg="4">
                        <div className="shadow mt-4">
                            <Card>
                                <CardTitle className="text-center">Offline</CardTitle>
                                <CardBody>
                                    <OfflineTable />
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