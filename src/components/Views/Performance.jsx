import LatencyLineChart from 'components/Charts/LatencyLineChart';
import { ComplexTable } from 'components/Tables/ComplexTable';
import React, { Fragment, PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import '../Settings/theme.css';
import './Performance.css';
import moment from 'moment';
import UptimeDoughtnutChart from 'components/Charts/UptimeDoughtnutChart';
import { ShadowBox } from 'components/Design/ShadowBox';

export class Performance extends PureComponent {
    // static displayName = ManageEndPoints.name;
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            endpointData: {
                id: "",
                ip: "",
                description: "",
                isReachable: "",
                averageLatency: "",
                lastDownTime: "",
                lastSeen: "",
            }
        }
    }
    handleOnClickTable = (rowData) => {
        if (!rowData)
            return;
        let data = {
            id: rowData["id"],
            ip: rowData["ip"].toUpperCase(),
            description: rowData["description"].toUpperCase(),
            averageLatency: rowData["averageLatency"],
            lastDownTime: rowData["lastDownTime"],
            isReachable: false,
            lastSeen: rowData["lastSeen"]
        }
        if (typeof rowData["isReachable"] === 'string')
            data.isReachable = rowData["isReachable"].toUpperCase() === "ONLINE" ? true : false;
        else if(typeof rowData["isReachable"] === 'boolean')
            data.isReachable = rowData["isReachable"];

        this.setState({ endpointData: { ...data } });
    }
    handleOnDataLoad = (firstDataRow) => {
        if (firstDataRow && this.state.endpointData.id.length == 0)
            this.handleOnClickTable(firstDataRow);
    }   
    renderOnlineOffline = () => {
        const { isReachable } = this.state.endpointData;
        if (isReachable)
            return <div className="badge badge-success ml-3">
                <i className="fa fa-power-off" aria-hidden="true"></i>&nbsp;Online</div>;
        else if (isReachable === false)
            return <div className="badge badge-danger ml-3">
                <i className="fa fa-times-circle-o" aria-hidden="true"></i>&nbsp;Offline</div>;
        return <div></div>;
    }
    render() {
        const { ip, id } = this.state.endpointData;
        const tableOptions = {
            headersMap: {
                "id": "id",
                "isReachable": "",
                "ip": "Site",
                "description": "Description",
                "averageLatency": "Average Latency",
                "lastDownTime": "Last Reported Failure",
                "lastSeen": "Last Seen"
            },
            hideColumns: {
                "id": "id"
            },
            dateColumns: ["lastDownTime", "lastSeen"],
            route: "EndPoints/Statistics"
        }
        const chartHoursTodisplay = 24;
        const startDate = moment.utc().subtract(chartHoursTodisplay, 'hours').format();
        const endDate = moment.utc().format();
        return (
            <Fragment>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <h3>{ip ? ip : "  "}{this.renderOnlineOffline()}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg='9'>
                                <ShadowBox isChart className="chart-box">
                                    <LatencyLineChart endpointId={id} startDate={startDate} endDate={endDate} />
                                </ShadowBox>
                            </Col>
                            <Col lg='3'>
                                <ShadowBox isChart className="doughnut-box">
                                    <UptimeDoughtnutChart endpointId={id} startDate={startDate} endDate={endDate} />
                                </ShadowBox>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ShadowBox>
                            <ComplexTable onDataLoad={this.handleOnDataLoad} onClick={this.handleOnClickTable} {...tableOptions} />
                        </ShadowBox>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}