
import React, { Component } from 'react';
import { CardTitle, Card, Container, Row, Col, CardBody, Spinner,Form,Button,Label,Input, FormGroup } from 'reactstrap';
import { EndPoint } from '../Models/EndPoint';
import { EndPointService } from '../Services/endpointservice';
import { toast } from 'react-toastify';
import { AuthService } from '../Services/authservice';
import { FetchTable } from '../Design/FetchTable';

export class ManageEndPoints extends Component {
   // static displayName = ManageEndPoints.name;
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            endpoints: []
        }
    }
    componentDidMount() {
      //  var data = this.fetchGetAllEndPoints();
       // this.timer = setInterval(()=> this.fetchGetAllEndPoints(), 60000);
    }
    componentWillUnmount() {
       // clearInterval(this.timer);
       // this.timer = null;
    }
    /**
     * @returns {EndPoint} endpoint
     */
    // fetchGetAllEndPoints = async () => {
    //     this.setState({isFetching: true});
    //     let errorCode;
    //     const endpoints = EndPointService.getAllEndPoints();
    //     let endpoint = new EndPoint();
    //     await endpoints.then(data => {
    //         return ep = EndPoint.fromJson(data);
    //     }).catch(err => {
    //         //do something with error code.
    //     });
    //     this.setState({isFetching: false});
    //     return ep;
    // }
    onSubmitAddEndpoint = async (event) => {
        const desc = event.target.description.value
        const userid = AuthService.getUserID();
        const result = await this.fetchPostEndPoint(new EndPoint(userid,desc));
    }
    fetchPostEndPoint = async (endPoint) => {
        this.setState({isFetching: true});
        let error;
        const result = EndPointService.postEndPoint(endPoint)
        .catch(err => error = err).finally(()=> {
            if (error)
                toast.error(error);
            else 
                toast.success("success");
        })

        this.setState({isFetching: false});
    }
    render() {
        let display = this.state.isFetching ? <Spinner/> : <div></div>;
        const headers = {
            "id": "ID",
            "description": "Description"
        }
        return (
            <Container>
                <Row>
                    <Col lg="12" >
                        <div className="shadow mt-4">
                            <Card>
                                <CardTitle >Add Endpoint</CardTitle>
                                <CardBody>
                                    <Form onSubmit={this.onSubmitAddEndpoint}>
                                        <FormGroup>
                                            <Label>Description</Label>
                                            <Input name="description" placeholder="add a description for this endpoint"/>
                                        </FormGroup>
                                        <Button type="submit">ADD</Button>
                                    </Form>
                                   <div className="text-center">
                                        {display}
                                   </div>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" >
                        <div className="shadow mt-4">
                            <Card>
                                <CardTitle >Add Endpoint</CardTitle>
                                <CardBody>
                                   <div className="text-center">
                                        <FetchTable route="EndPoints" headersMap={headers}></FetchTable>
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