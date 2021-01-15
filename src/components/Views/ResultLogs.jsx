import React, { Fragment, PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import '../Settings/theme.css';
import { ComplexTable } from 'components/Tables/ComplexTable';
import { ResultFilter } from 'components/Filters/ResultFilter';
import { ShadowBox } from 'components/Design/ShadowBox';

export class ResultLogs extends PureComponent {
    // static displayName = ManageEndPoints.name;
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            headersMap: {
                "id": "id",
                "isReachable": "",
                "timeStamp": "",
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