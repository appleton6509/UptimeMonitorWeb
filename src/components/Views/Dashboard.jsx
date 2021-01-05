import React, { Component } from 'react';
import { CardTitle, Card, Container, Row, Col, CardBody } from 'reactstrap';
import { Context } from '../Provider/AuthContext';
import { DashboardService } from '../Services/dashboardservice';
import CustomChart from '../Charts/CustomChart';

export class Dashboard extends Component {
    static displayName = Dashboard.name;
    static contextType = Context;
    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            labels: ['Online', 'Offline'],
            title: 'Connected Devices'
        }
    }

    getToken = () => {
        let mycontext = this.context;
        return mycontext.user.token;
    }
    componentDidMount() {
        let on = 0;
        let off = 0;
     DashboardService.getOnlineOffline(this.getToken())
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

    render() {
        const {title,labels} = this.state
        return (
            <Container>
                <Row>
                    <Col lg="6">
                        <div className="shadow mt-4">
                            <Card>
                                <CardBody>
                                    <CustomChart data={this.state.data} title={title} labels={labels}></CustomChart>
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