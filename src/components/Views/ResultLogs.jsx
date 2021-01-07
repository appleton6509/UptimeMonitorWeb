import React, { PureComponent } from 'react';
import { Card, Container, Row, Col, CardBody } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../Authorization/AuthContext';
import { LogsTable } from 'components/Tables/LogsTable';

export class ResultLogs extends PureComponent {
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
                        <ToastContainer
                            position="bottom-center"
                            autoClose={5000}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                        <div className="shadow mt-3">
                            <LogsTable />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}