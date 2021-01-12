import { ComplexTable } from 'components/Tables/ComplexTable';
import React, { Fragment, PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import '../Settings/theme.css';
import './Performance.css';

export class Performance extends PureComponent {
    // static displayName = ManageEndPoints.name;
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            ip: "",
            description: "",
            isReachable: "",
            averageLatency: "",
            lastDownTime: "",
            lastSeen: "",
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
    }
    handleFilterChange = (filterQuery) => {
        this.setState({ filter: filterQuery });
    }
    handleOnClick = (rowData) => {
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
        this.setState({ ...data });
    }
    renderOnlineOffline = () => {
        const { isReachable } = this.state;
        if (isReachable)
            return <div className="badge badge-success"><h1 className="pl-3 pr-3">
                <i className="fa fa-power-off" aria-hidden="true"></i> Online</h1></div>;
        else if (isReachable === false)
            return <div className="badge badge-danger"><h1 className="pl-3 pr-3">
                <i className="fa fa-times-circle-o" aria-hidden="true"></i> Offline</h1></div>;
        return <div></div>;
    }
    render() {
        const { id, ip, description, averageLatency,
            lastDownTime, isReachable, lastSeen } = this.state;
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h3>{ip ? ip : "  "}</h3>
                    </Col>
                </Row>
                <Row style={{ height: "30vh" }}>
                    <Col>
                        <div className="shadow theme1-bg theme1-border" style={{ height: "30vh" }}>asdasd
                   </div>
                    </Col>
                    <Col lg="3">
                        <div style={{ height: "30vh" }}>
                            <div className="xcenter">
                                {this.renderOnlineOffline()}
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="shadow mt-3 theme1-bg theme1-border">
                            <ComplexTable onClick={this.handleOnClick} {...this.state} />
                        </div>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}