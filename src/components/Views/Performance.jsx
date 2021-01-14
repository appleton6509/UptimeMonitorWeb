import LatencyLineChart from 'components/Charts/LatencyLineChart';
import { ComplexTable } from 'components/Tables/ComplexTable';
import React, { Fragment, PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import '../Settings/theme.css';
import './Performance.css';
import moment from 'moment';

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
        const data = {
            id: rowData["id"],
            ip: rowData["ip"].toUpperCase(),
            description: rowData["description"].toUpperCase(),
            averageLatency: rowData["averageLatency"],
            lastDownTime: rowData["lastDownTime"],
            isReachable: rowData["isReachable"].toUpperCase() === "ONLINE" ? true : false,
            lastSeen: rowData["lastSeen"]
        }
        this.setState({endpointData: {...data}});
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
        const startDate = moment.utc().subtract(4,'hours').format();
        const endDate = moment.utc().format();
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h3>{ip ? ip : "  "}{this.renderOnlineOffline()}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col lg="9">
                        <div className="shadow theme1-bg theme1-border">
                            <LatencyLineChart endpointId={id} startDate={startDate} endDate={endDate} />
                        </div>
                    </Col>
                    <Col lg="3">
                            <div className="xcenter">
                                
                            </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="shadow mt-3 theme1-bg theme1-border">
                            <ComplexTable onClick={this.handleOnClickTable} {...tableOptions} />
                        </div>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}