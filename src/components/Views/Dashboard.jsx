import React, { Component } from 'react';
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
            <Container>
                <Row>
                <Col lg="8" >
                        <div className="mt-4 shadow theme1-bg theme1-border"  style={{height: "80vh"}} >
                            <OfflineTable />
                        </div>
                    </Col>
                    <Col lg="4">
                        <div className="doughnut shadow theme1-bg theme1-border">
                            <OnOffDoughnutChart style={{height: "12rem"}}  />
                        </div>
                    </Col>
                </Row>

            </Container>
        );
    }
}