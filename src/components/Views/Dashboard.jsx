import React, { Component } from 'react';
import { CardTitle, Card, Container, Row, Col, CardBody } from 'reactstrap';
import { Context } from '../Provider/AuthContext';
import { DashboardService } from '../Services/dashboardservice';

export class Dashboard extends Component {
    static displayName = Dashboard.name;
    static contextType = Context;
    
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                online: 0,
                offline: 0
            }],
            labels: [{"o"}]
        }
    }

    getToken = () => {
        let mycontext = this.context;
        return mycontext.user.token;
    }
    componentDidMount() {
        this.getOnlineOfflineData()
        .then(myData=> {
            this.setState({data: myData });
        });
    }
    getOnlineOfflineData = async () => {
        let on = 0;
        let off = 0;
        await DashboardService.getOnlineOffline(this.getToken())
        .then(data=> {
            data.forEach(element => {
                const [ip,timedate,reachable] = Object.entries(element);
                reachable[1] ? on++ : off++;
            });
        }).catch(err => {
            console.log(err);
        })
        return {online: on, offline: off}
    }
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