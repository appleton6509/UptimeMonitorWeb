import React, { Component } from 'react';
import { Row, Col, Form, Button, Label, Input, FormGroup, InputGroup, DropdownMenu, DropdownItem, DropdownToggle, Dropdown } from 'reactstrap';
import { EndPointService } from '../Services/endpointservice';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import ipRegex from 'ip-regex';
import urlRegex from 'url-regex-safe'
export class ManageEndPointForm extends Component {
    static propTypes = {
        endpoint: PropTypes.object.isRequired,
        onPostSuccess: PropTypes.func,
        protocols: PropTypes.array
    }
    constructor(props) {
        super(props);
        this.state = {
            isModifying: false,
            dropdownOpen: false,
                ip: "",
                description: "",
                id: "",
                protocol: "Https",
                userid: "",
                notifyonfailure: true
        }
    }
    processEndPointProps = () => {
        const {ip,description, id, protocol, userid, notifyonfailure} = {...this.props.endpoint}
         this.setState({ isModifying: true, ip: ip, description: description, id: id, 
            protocol: protocol, userid: userid, notifyonfailure: notifyonfailure === 'true' ? true : false });
    }
    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps.endpoint) != JSON.stringify(this.props.endpoint)) {
            this.processEndPointProps()
        }
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
    isValidUrl = (url) => {
        let isValidIp = ipRegex().test(url);
        let isValidUrl = urlRegex({localhost: false}).test(url);
         if (isValidIp || isValidUrl)
            return true
        else
            return false;
    }

    onClickReset = () => {
        this.setState({isModifying: false});
        this.resetEndPointState();
    }

    onSubmitAddEndpoint = async (event) => {
        event.preventDefault();
        const { ip, description, id, protocol, userid } = event.target;

        if (!this.isValidUrl(ip.value)) {
            toast.error("Site must be a valid web/ip address");
            return;
        }

        let endPointPost = {
            Ip: ip.value,
            Description: description.value,
            Protocol: protocol.innerText,
            NotifyOnFailure: this.state.notifyonfailure
        };
        let endPointPut = {
            Id: id.value,
            Ip: ip.value,
            Description: description.value,
            Protocol: protocol.innerText,
            NotifyOnFailure: this.state.notifyonfailure,
            UserId: userid.value
        };

        if (this.state.isModifying) {
            this.fetchPutEndPoint(endPointPut).then(res => {
                if (res !== undefined && res.ok) {
                    this.resetEndPointState();
                    this.setState({isModifying: false});
                    this.props.onPostSuccess();
                }
            })
        } else {
            this.fetchPostEndPoint(endPointPost).then(res => {
                if (res !== undefined && res.ok) {
                    this.resetEndPointState();
                    this.props.onPostSuccess();
                }
            })
        }
    }
    resetEndPointState = () => {
        this.setState({ ip: "", description: "", userid: "", notifyonfailure: false,
        id: "", protocol: "Https" });
    }
    toggleDropDown = () => {
        const { dropdownOpen } = this.state;
        this.setState({ dropdownOpen: !dropdownOpen });
    }
    onDropDown_Protocol = (e) => {
        if (e.target.innerText === '')
            return;
        this.setState({ protocol: e.target.innerText });
    }

    onChecked_NotifyOnFailure = (e) => {
        const { notifyonfailure } = {...this.state}
       this.setState({ notifyonfailure: !notifyonfailure });
    }
    render() {
        const { dropdownOpen } = this.state;
        const {ip,protocol, description, id, notifyonfailure, userid} = {...this.state}

        return (
            <Form onSubmit={this.onSubmitAddEndpoint} autoComplete="new-password">
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>Site</Label>
                            <InputGroup>
                                <Dropdown addonType="prepend" isOpen={dropdownOpen} toggle={this.toggleDropDown}>
                                    <DropdownToggle caret id="protocol" name="protocol">{protocol}</DropdownToggle>
                                    <DropdownMenu onClick={this.onDropDown_Protocol}>
                                    {this.props.protocols.map((value, index) => {
                                        const keyval = "dropdown-"+index;
                                        return (<DropdownItem key={keyval}>{value}</DropdownItem>);
                                    })}
                                    </DropdownMenu>
                                </Dropdown>
                                <Input autoComplete="new-password" onChange={e => this.setState({ ip: e.target.value })} id="ip" name="ip" value={ip} placeholder="www.uptime.com" />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input autoComplete="new-password" onChange={e => this.setState({  description: e.target.value })} id="description" name="description" value={description}
                                placeholder="Site Description" />
                        </FormGroup>
                        <FormGroup>
                            <Input id="id" name="id" value={id} readOnly hidden={true} />
                        </FormGroup>
                        <FormGroup>
                            <Input id="userid" name="userid" value={userid} readOnly hidden={true} />
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
                    </Col>
                    <Col>
             <FormGroup className="ml-4">
             <Input type="checkbox" id="notifyonfailure" name="notifyonfailure" checked={notifyonfailure} onChange={this.onChecked_NotifyOnFailure} />
                 <Label check>Email on Failure?</Label>
             </FormGroup>
                    </Col>
                </Row>
            </Form>
        );
    }
}