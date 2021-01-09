import React, { PureComponent } from 'react';
import {  Container, Row, Col } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import { LogsTable } from 'components/Tables/LogsTable';
import '../Settings/theme.css';

export class Performance extends PureComponent {
    // static displayName = ManageEndPoints.name;
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            isModifying: false,
            endpoints: []
        }
    }

    render() {

        return (
            <Container>
                <Row>
                    <Col lg="12" >
                        <div className="shadow mt-3 theme1-bg theme1-border">
                            <LogsTable />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}