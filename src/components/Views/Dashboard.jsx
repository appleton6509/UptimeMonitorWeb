import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import { OfflineTable } from 'components/Tables/OfflineTable';
import OnlineDoughnutChart from '../Charts/OnlineDoughnutChart';
import '../Settings/theme.css';
import "./Dashboard.css";
import { ShadowBox } from 'components/Design/ShadowBox';
import "../Settings/theme.css";
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
                        <ShadowBox className="toprow" isChart >
                            <OnlineDoughnutChart />
                        </ShadowBox>
                    </Col>
                    <Col lg="3">
                        <ShadowBox className="toprow" >
                            <p className="text-center title-style">Offline</p>
                            <OfflineTable showHeaders={false}/>
                        </ShadowBox>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}