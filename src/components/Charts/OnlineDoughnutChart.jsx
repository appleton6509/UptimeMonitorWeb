import { EndPointService } from 'components/Services/endpointservice';
import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DoughnutChart from "./DoughnutChart";
import "./OnlineDoughnutChart.css";
import "../Settings/theme.css";
export default class OnlineDoughtnutChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            centerData: "",
            centerLabel: "Up",
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
        return await EndPointService.getOnlineOffline()
            .then(res => { return res.json() })
            .then(data => {
                data.forEach(element => {
                    // eslint-disable-next-line no-unused-vars
                    const [ip,reachable, timedate ] = Object.entries(element);
                    reachable[1] ? on++ : off++;
                });
            })
            .then(() => {
                const total = on + off;
                const onPercentage = (on / total) * 100;
                this.setState({ data: [on, off], centerData: Math.round(onPercentage) + "%", isLoading: false })
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        const { data, title, centerData, labels } = this.state
        return (
            <Container>
                <Row>
                    <Col className="text-center">
                        <p className="title-style">Online</p>
                    </Col>
                </Row>

                <Row >
                    <Col className="pt-2 pb-2">
                        <DoughnutChart data={data} labels={labels} centerData={centerData} />
                    </Col>
                </Row>
                <Row>
                    <Col className={this.state.isLoading ? "hide" : ""}>
                    <div className="box">
                    <div className="badge badge-success chart-label m-auto">{data[0]} - {labels[0]}</div>
                    <div className="badge badge-danger chart-label m-auto">{data[1]} - {labels[1]}</div>
                    </div>
                     <br />
                    </Col>
                </Row>
            </Container>
        );
    }
}