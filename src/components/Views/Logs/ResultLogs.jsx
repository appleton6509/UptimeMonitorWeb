import React, { Fragment, PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import { AuthContext } from 'components/Authorization/AuthContext';
import 'components/Settings/theme.css';
import { ComplexTable } from 'components/Generic/Tables/ComplexTable';
import { ResultFilter } from 'components/Views/Logs/components/ResultFilter';
import { ShadowBox } from 'components/Generic/Design/ShadowBox';

export class ResultLogs extends PureComponent {
    // static displayName = ManageEndPoints.name;
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            headersMap: {
                "id": "id",
                "isReachable": "",
                "timeStamp": "Timestamp",
                "protocol": "Protocol",
                "ip": "Site",
                "description": "Description",
                "latency": "Latency",
                "status": "Message"
            },
            hideColumns: {
                "id": "id"
            },
            dateColumns: ["timeStamp"],
            route: "Result/logs",
            filter: ""
        }
    }
    handleFilterSelection = (values) => {
        this.setState({ filter: values });
    }
    render() {
        return (
            <Fragment>
                <Row>
                    <Col lg="12" >
                        <ShadowBox>
                            <ComplexTable {...this.state}>
                                <ResultFilter onSelection={this.handleFilterSelection} />
                            </ComplexTable>
                        </ShadowBox>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}