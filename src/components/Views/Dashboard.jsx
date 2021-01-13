import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import { OfflineTable } from 'components/Tables/OfflineTable';
import OnOffDoughnutChart from 'components/Charts/OnOffDoughnutChart';
import '../Settings/theme.css';
import "./Dashboard.css";

export class Dashboard extends Component {
    static displayName = Dashboard.name;
    static contextType = AuthContext;

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.context.checkauthorization();
    }

    render() {

        return (
            <Fragment>
                <Row>
                    <Col lg="3">
                        <div className="doughnut shadow theme1-bg theme1-border">
                            <OnOffDoughnutChart />
                        </div>
                    </Col>
                    <Col lg="4">
                        <div className="mt-3 shadow theme1-bg theme1-border" style={{ height: "50vh" }} >
                            <h4 className="text-center"><p>Sites Offline</p></h4>
                            <OfflineTable />
                        </div>
                    </Col>
                </Row>
                <Row>

                </Row>
            </Fragment>
        );
    }
}