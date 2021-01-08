import React, { Component, PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { DashboardService } from '../Services/dashboardservice';
import DoughnutChart from "./DoughnutChart";
import "./OnOffDoughnutChart.css";

export default class OnOffDoughnutChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            labels: ['Online', 'Offline'],
            title: 'Connected Devices',
            isLoading: 'true'
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
                this.setState({ data: [on, off], isLoading: false })
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
                    <Col lg="4" className={this.state.isLoading ? "hide" : ""}>
                    <div className="mt-3"><b className="highlight-box-green">{data[0]}</b> {labels[0]}</div>
                    <div className="mt-1"><b className="highlight-box-red">{data[1]}</b> {labels[1]}</div>
                    </Col>
                </Row>
            </Container>
        );
    }
}