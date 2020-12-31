
import React, { Component } from 'react';
import { CardTitle, Card, Container, Row, Col, CardBody, Form, Button, Label, Input, FormGroup } from 'reactstrap';
import { EndPoint } from '../Models/EndPoint';
import { EndPointService } from '../Services/endpointservice';
import { toast, ToastContainer } from 'react-toastify';
import { FetchTable } from '../Design/FetchTable';

export class ManageEndPoints extends Component {
    // static displayName = ManageEndPoints.name;
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            isModifying: false,
            endpoints: []
        }
    }
    componentDidMount() {

        // this.timer = setInterval(()=> this.fetchGetAllEndPoints(), 60000);
    }
    componentWillUnmount() {
        // clearInterval(this.timer);
        // this.timer = null;
    }
    onSubmitAddEndpoint = async (event) => {
        const desc = event.target.description.value
        const ip = event.target.ip.value
        const id = event.target.id.value
        let endpoint = new EndPoint(id, desc, ip);
        this.state.isModifying ?
            await this.fetchPutEndPoint(endpoint).catch(err => toast.error(err)) :
            await this.fetchPostEndPoint(endpoint).catch(err => toast.error(err));
        this.setState({isModifying: false}); 
    }
    onClickGetSelected = (epobject) => {
        document.getElementById("id").value = epobject["id"];
        document.getElementById("description").value = epobject["description"];
        document.getElementById("ip").value = epobject["ip"];
        this.setState({isModifying: true});
    }
    onClickReset = () => {
        this.setState({isModifying: false});
    }
    onChangeHandler = (e) => {
        document.getElementById(e.target.id).value = e.target.value
    }
    fetchPutEndPoint = async (endPoint) => {
        EndPointService.putEndPoint(endPoint)
            .catch(err => toast.error(err))
            .finally(() => toast.success("Updated"));
    }
    fetchPostEndPoint = async (endPoint) => {
        this.setState({ isFetching: true });
        await EndPointService.postEndPoint(endPoint)
            .catch(err => toast.error(err));
        this.setState({ isFetching: false });
    }
    render() {
        const headers = {
            "id": "ID",
            "ip": "IP / DNS",
            "description": "DESCRIPTION"
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
                                <CardTitle ></CardTitle>
                                <CardBody>
                                        <Form onSubmit={this.onSubmitAddEndpoint}>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Label>Description</Label>
                                                    <Input onChange={this.onChangeHandler} id="description" name="description" placeholder="add a description for this endpoint" />
                                                </FormGroup>
                                                <Button type="submit" hidden={this.state.isModifying}>ADD</Button>
                                                <Button type="submit" hidden={!this.state.isModifying}>UPDATE</Button>
                                                <Button type="reset" onClick={this.onClickReset} hidden={!this.state.isModifying}>RESET</Button>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <Label>IP / DNS</Label>
                                                    <Input onChange={this.onChangeHandler} id="ip" name="ip" placeholder="ip address / DNS" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Input onChange={this.onChangeHandler} id="id" name="id" hidden={true} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" >
                        <div className="shadow mt-4">
                            <Card>
                                <CardTitle></CardTitle>
                                <CardBody>
                                    <div className="text-center">
                                        <FetchTable route="EndPoints" headersMap={headers} onClick={this.onClickGetSelected}></FetchTable>
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