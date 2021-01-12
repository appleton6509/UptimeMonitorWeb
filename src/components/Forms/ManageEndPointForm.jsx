import React, { Component } from 'react';
import { Row, Col, Form, Button, Label, Input, FormGroup } from 'reactstrap';
import { EndPointService } from '../Services/endpointservice';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export class ManageEndPointForm extends Component {
    static propTypes = {
        endpoint: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            isModifying: false,
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps !== this.props) {
            document.getElementById("id").value = nextProps.endpoint.id;
            document.getElementById("description").value = nextProps.endpoint.description;
            document.getElementById("ip").value = nextProps.endpoint.ip;
            this.setState({ isModifying: true });
        }
        else if (nextState !== this.state) {
            return true;
        }
        return false;
    }
    fetchPutEndPoint = async (endPoint) => {
        EndPointService.put(endPoint)
            .catch(err => toast.error(err))
            .finally(() => toast.success("Updated"));
    }
    fetchPostEndPoint = async (endPoint) => {
        await EndPointService.post(endPoint)
            .catch(err => toast.error(err));
    }

    onClickReset = () => {
        this.setState({ isModifying: false });
    }
    onClickDelete = () => {
        EndPointService.delete(document.getElementById("id").value);
        this.setState({ isModifying: false });
    }

    onSubmitAddEndpoint = async (event) => {
        let endpoint = {
            id: event.target.id.value,
            ip: event.target.ip.value,
            description: event.target.description.value
        };
        let result = this.state.isModifying ?
            await this.fetchPutEndPoint(endpoint) :
            await this.fetchPostEndPoint(endpoint);

        if (result.success)
            this.props.onPostSuccess();
        this.setState({ isModifying: false });
    }
    onChangeHandler = (e) => {
        document.getElementById(e.target.id).value = e.target.value
    }

    render() {
        return (
            <Form onSubmit={this.onSubmitAddEndpoint}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>Site</Label>
                            <Input onChange={this.onChangeHandler} id="ip" name="ip" placeholder="website / ip address" />
                        </FormGroup>
                        <Button type="submit" hidden={this.state.isModifying}>ADD</Button>
                        <Button type="submit" hidden={!this.state.isModifying} className="mr-3">UPDATE</Button>
                        <Button type="reset" onClick={this.onClickReset} hidden={!this.state.isModifying} className="mr-3">RESET</Button>
                        <Button type="reset" onClick={this.onClickDelete} hidden={!this.state.isModifying} className="mr-3">DELETE</Button>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input onChange={this.onChangeHandler} id="description" name="description"
                                placeholder="a description" />
                        </FormGroup>
                        <FormGroup>
                            <Input onChange={this.onChangeHandler} id="id" name="id" hidden={true} />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        );
    }
}