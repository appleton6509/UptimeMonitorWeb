import React, { PureComponent } from 'react';
import {  Container, Row, Col } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import '../Settings/theme.css';
import { ComplexTable } from 'components/Tables/ComplexTable';
import { ResultFilter } from 'components/Filters/ResultFilter';

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
             route:"Result/logs",
             filter: ""
        }
    }
    handleFilterSelection = (values) => {
        this.setState({filter: values});
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col lg="12" >
                        <div className="shadow mt-3 theme1-bg theme1-border">
                                <ComplexTable {...this.state}>
                                    <ResultFilter onSelection={this.handleFilterSelection}/>
                                </ComplexTable>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}