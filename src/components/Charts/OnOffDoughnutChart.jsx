import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { DashboardService } from '../Services/dashboardservice';
import DoughnutChart from "./DoughnutChart";
import "./OnOffDoughnutChart.css";

export default class OnOffDoughnutChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            labels: ['Online', 'Offline'],
            title: 'Connected Devices'
        }
    }
    async componentDidMount() {
        await this.fetchOnlineOfflineData();
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
                this.setState({ data: [on, off] })
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        const { data, title, labels } = this.state
        return (
            <Container>
                <Row>
                    <Col lg="8">
                        <DoughnutChart data={data} title={title} labels={labels} />
                    </Col>
                    <Col lg="4">
                    <div className="mt-4">
                    <b className="highlight-box-green">{data[0]}</b> {labels[0]}
                    </div>
                    <br/>
                    <b className="highlight-box-red">{data[1]}</b> {labels[1]}
                    </Col>
                </Row>
            </Container>
        );
    }
}