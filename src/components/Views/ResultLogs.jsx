import React, { PureComponent } from 'react';
import { CardTitle, Card, Container, Row, Col, CardBody, Form, Button, Label, Input, FormGroup } from 'reactstrap';
import { EndPoint } from '../Models/EndPoint';
import { EndPointService } from '../Services/endpointservice';
import { toast, ToastContainer } from 'react-toastify';
import { FetchTable } from '../Tables/FetchTable';
import { AuthContext } from '../Authorization/AuthContext';

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
        const headers = {
            "id" : "id",
            "timeStamp": "Timestamp",
            "ip": "Site",
            "isReachable": "Avaliable?",
            "description": "Description",
            "latency" : "Latency",
            "status" : "Status"
        }
        const hideColumns = {
            "id": "id"
        }
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
                        <div className="shadow mt-4">
                            <Card>
                                <CardTitle></CardTitle>
                                <CardBody>
                                    <div className="text-center">
                                        <FetchTable route="EndPoints/logs" headersMap={headers} hideColumns={hideColumns}></FetchTable>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}