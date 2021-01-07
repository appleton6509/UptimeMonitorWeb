import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import { OfflineTable } from 'components/Tables/OfflineTable';
import OnlineDoughnutChart from 'components/Charts/OnlineDoughnutChart';
import OfflineDoughnutChart from 'components/Charts/OfflineDoughnutChart';
import OnOffDoughnutChart from 'components/Charts/OnOffDoughnutChart';

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
            <Container>
                <Row>
                    <Col lg="4">
                        <div className="doughnut">
                            <OnOffDoughnutChart />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" >
                        <div className="mt-4 shadow">
                            <OfflineTable />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}