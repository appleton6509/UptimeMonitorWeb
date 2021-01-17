import React, { Component } from 'react';
import { Row, Col, Form, Button, Label, Input, FormGroup, InputGroupText, InputGroup, InputGroupAddon } from 'reactstrap';
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
            if (nextProps.endpoint.id)
                this.setState({ isModifying: true });
        }
        else if (nextState !== this.state) {
            return true;
        }
        return false;
    }
    fetchPutEndPoint = async (endPoint) => {
        return await EndPointService.put(endPoint)
            .catch(err => toast.error(err))
    }
    fetchPostEndPoint = async (endPoint) => {
        let value = await EndPointService.post(endPoint)
            .catch(err => { toast.error(err) })
            return value
    }

    onClickReset = () => {
        this.setState({ isModifying: false });
    }
    onClickDelete = () => {
        EndPointService.delete(document.getElementById("id").value);
        this.setState({ isModifying: false });
    }

    onSubmitAddEndpoint = async (event) => {
        event.preventDefault();
        let endPointPost = {
            Ip: event.target.ip.value,
            Description: event.target.description.value
        };
        let endPointPut = {
            Id: event.target.id.value,
            Ip: event.target.ip.value,
            Description: event.target.description.value
        };

        if (this.state.isModifying) {
            this.fetchPutEndPoint(endPointPut).then(res => {
                if (res !== undefined && res.ok) {
                    this.setState({ isModifying: false });
                    event.target.reset();
                    this.props.onPostSuccess();
                }
            })
        } else {
            this.fetchPostEndPoint(endPointPost).then(res => {
                if (res !== undefined && res.ok) {
                    event.target.reset();
                    this.props.onPostSuccess();
                }
            })
        }
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
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-globe"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input onChange={this.onChangeHandler} id="ip" name="ip" placeholder="www.uptime.com" />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input onChange={this.onChangeHandler} id="description" name="description"
                                placeholder="Site Description" />
                        </FormGroup>
                        <FormGroup>
                            <Input onChange={this.onChangeHandler} id="id" name="id" hidden={true} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Button type="submit" color="info" hidden={this.state.isModifying}>
                            <i className="fa fa-plus"></i>&nbsp;ADD</Button>
                        <Button type="submit" color="info" hidden={!this.state.isModifying} className="mr-3">
                            <i className="fa fa-refresh"></i>&nbsp;UPDATE</Button>
                        <Button type="reset" color="info" onClick={this.onClickReset} hidden={!this.state.isModifying} className="mr-3">
                            <i className="fa fa-arrow-circle-up"></i>&nbsp;RESET</Button>
                        <Button type="reset" color="danger" onClick={this.onClickDelete} hidden={!this.state.isModifying} className="mr-3">
                            <i className="fa fa-trash"></i>&nbsp;DELETE</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}