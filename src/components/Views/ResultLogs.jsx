import React, { PureComponent } from 'react';
import {  Container, Row, Col } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import '../Settings/theme.css';
import { ComplexTable } from 'components/Tables/ComplexTable';

export class ResultLogs extends PureComponent {
    // static displayName = ManageEndPoints.name;
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
             headers: {
                "id": "id",
                "timeStamp": "",
                "ip": "Site",
                "description": "Description",
                "isReachable": "",
                "latency": "Latency",
                "status": "Message"
            },
             hideColumns: {
                "id": "id"
            },
             dateColumns: ["timeStamp"],
             route:"Result/logs"
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col lg="12" >
                        <div className="shadow mt-3 theme1-bg theme1-border">
                                <ComplexTable {...this.state}></ComplexTable>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}