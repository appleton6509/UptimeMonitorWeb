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
            return <div className="badge badge-success"><h1 className="pl-3 pr-3">
                <i className="fa fa-power-off" aria-hidden="true"></i> Online</h1></div>;
        else if (isReachable === false)
            return <div className="badge badge-danger"><h1 className="pl-3 pr-3">
                <i className="fa fa-times-circle-o" aria-hidden="true"></i> Offline</h1></div>;
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
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h3>{ip ? ip : "  "}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col lg="9" >
                        <div className="shadow theme1-bg theme1-border">
                            <LatencyLineChart endpointId={id} startDate={moment.utc().subtract(1,'hours').format()} endDate={moment.utc().format()} />
                        </div>
                    </Col>
                    <Col lg="3">
                            <div className="xcenter">
                                {this.renderOnlineOffline()}
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