
import React, {  PureComponent } from 'react';
import { CardTitle, Card, Container, Row, Col, CardBody, Form, Button, Label, Input, FormGroup } from 'reactstrap';
import { EndPoint } from '../Models/EndPoint';
import { EndPointService } from '../Services/endpointservice';
import { toast, ToastContainer } from 'react-toastify';
import { FetchTable } from '../Design/FetchTable';
import { Context } from '../Provider/AuthContext';

export class ManageEndPoints extends PureComponent {
    // static displayName = ManageEndPoints.name;
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            isModifying: false,
            endpoints: []
        }
    }

    componentDidMount() {
        this.setState({token: this.context.user.token})
    }

    getToken = () => {
        let mycontext = this.context;
        return mycontext.user.token;
    }
    onSubmitAddEndpoint = async (event) => {
        let endpoint = 
            new EndPoint(
                event.target.id.value,
                event.target.ip.value,
                event.target.description.value);
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
    onClickDelete = (e) => {
        EndPointService.delete(document.getElementById("id").value,this.state.token);
        this.setState({isModifying: false});
    }
    onChangeHandler = (e) => {
        document.getElementById(e.target.id).value = e.target.value
    }
    fetchPutEndPoint = async (endPoint) => {
        EndPointService.put(endPoint,this.state.token)
            .catch(err => toast.error(err))
            .finally(() => toast.success("Updated"));
    }
    fetchPostEndPoint = async (endPoint) => {
        this.setState({ isFetching: true });
        await EndPointService.post(endPoint,this.state.token)
            .catch(err => toast.error(err));
        this.setState({ isFetching: false });
    }
    render() {
        const headers = {
            "id": "ID",
            "ip": "IP / DNS",
            "description": "DESCRIPTION"
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
                                                <Button type="reset" onClick={this.onClickDelete} hidden={!this.state.isModifying}>DELETE</Button>
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
                                        <FetchTable route="EndPoints" headersMap={headers} hideColumns={hideColumns} onClick={this.onClickGetSelected}></FetchTable>
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