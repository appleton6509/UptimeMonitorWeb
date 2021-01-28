import React, { Component, PureComponent } from 'react';
import { Row, Col, Form, Button, Label, Input, FormGroup, InputGroupText, InputGroup, InputGroupAddon, InputGroupButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Dropdown } from 'reactstrap';
import { EndPointService } from '../Services/endpointservice';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import protocolmapper from 'components/Utilities/protocolmapper';

export class ManageEndPointForm extends Component {
    static propTypes = {
        endpoint: PropTypes.object.isRequired,
        onPostSuccess: PropTypes.func,
    }
    constructor(props) {
        super(props);
        this.state = {
            isModifying: false,
            dropdownOpen: false,
            endpoint: {
                ip: "",
                description: "",
                id: "",
                protocol: "Https",
                userid: "",
                notifyonfailure: true
            }
        }
    }
    processEndPointProps = () => {
        const {ip,description, id, protocol, userid, notifyonfailure} = {...this.props.endpoint}
         this.setState({ isModifying: true, endpoint: { ip: ip, description: description, id: id, 
            protocol: protocol, userid: userid, notifyonfailure: notifyonfailure === 'true' ? true : false } });
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
    validateUrl = (url, protocol) => {
        let urlcopy = url;
        let newUrl = protocol + "://" + urlcopy;
        const validUrlRegEx = new RegExp('^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$');
        if (validUrlRegEx.test(newUrl.toLowerCase()))
            return newUrl;
        else
            throw new Error("Site must be a valid web address");
    }

    onClickReset = () => {
        this.resetEndPointState();
    }

    onSubmitAddEndpoint = async (event) => {
        event.preventDefault();
        const { ip, description, id, protocol, userid, notifyonfailure } = event.target;

        try {
            this.validateUrl(ip.value, protocol.innerText)
        } catch (e) {
            toast.error(e.message);
            return;
        }

        let endPointPost = {
            Ip: ip.value,
            Description: description.value,
            Protocol: protocol.innerText,
            NotifyOnFailure: this.state.endpoint.notifyonfailure
        };
        let endPointPut = {
            Id: id.value,
            Ip: ip.value,
            Description: description.value,
            Protocol: protocol.innerText,
            NotifyOnFailure: this.state.endpoint.notifyonfailure,
            UserId: userid.value
        };

        if (this.state.isModifying) {
            this.fetchPutEndPoint(endPointPut).then(res => {
                if (res !== undefined && res.ok) {
                    this.resetEndPointState();
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
        this.setState({ endpoint: { ip: "", description: "", userid: "", notifyonfailure: "",
        id: "", protocol: "Https" } });
    }
    toggleDropDown = () => {
        const { dropdownOpen } = this.state;
        this.setState({ dropdownOpen: !dropdownOpen });
    }
    onDropDownSelect = (e) => {
        const { ip, description, id, userid, notifyonfailure } = {...this.state.endpoint}
        if (e.target.innerText === '')
            return;
        this.setState({
            endpoint: {
                protocol: e.target.innerText, id: id,
                ip: ip, description: description, 
                userid: userid, notifyonfailure: notifyonfailure
            }
        });
    }

    onCheckedChange = (e) => {
        const { ip, description, id, userid,protocol, notifyonfailure } = {...this.state.endpoint}
       this.setState({ endpoint: { description: description, ip: ip, id: id, protocol: protocol,userid: userid,
             notifyonfailure: !notifyonfailure }});
    }
    render() {
        const { dropdownOpen } = this.state;
        const {ip,protocol, description, id, notifyonfailure, userid} = {...this.state.endpoint}

        return (
            <Form onSubmit={this.onSubmitAddEndpoint} autoComplete="new-password">
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>Site</Label>
                            <InputGroup>
                                <Dropdown addonType="prepend" isOpen={dropdownOpen} toggle={this.toggleDropDown}>
                                    <DropdownToggle caret id="protocol" name="protocol">{protocol}</DropdownToggle>
                                    <DropdownMenu onClick={this.onDropDownSelect}>
                                        <DropdownItem>Https</DropdownItem>
                                        <DropdownItem>Http</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Input autoComplete="new-password" onChange={e => this.setState({ endpoint: { ip: e.target.value, id: id, description: description, protocol: protocol,userid: userid, notifyonfailure: notifyonfailure} })} id="ip" name="ip" value={ip} placeholder="www.uptime.com" />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input autoComplete="new-password" onChange={e => this.setState({ endpoint: { description: e.target.value, ip: ip, id: id, protocol: protocol,userid: userid, notifyonfailure: notifyonfailure } })} id="description" name="description" value={description}
                                placeholder="Site Description" />
                        </FormGroup>
                        <FormGroup>
                            <Input id="id" name="id" value={id} hidden={true} />
                        </FormGroup>
                        <FormGroup>
                            <Input id="userid" name="userid" value={userid} hidden={true} />
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
             <Input type="checkbox" id="notifyonfailure" name="notifyonfailure" checked={notifyonfailure} onChange={this.onCheckedChange} />
                 <Label check>Email on Failure?</Label>

             </FormGroup>
                    </Col>
                </Row>
            </Form>
        );
    }
}