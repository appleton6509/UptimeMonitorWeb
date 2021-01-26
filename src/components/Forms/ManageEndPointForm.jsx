import React, { Component, PureComponent } from 'react';
import { Row, Col, Form, Button, Label, Input, FormGroup, InputGroupText, InputGroup, InputGroupAddon, InputGroupButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { EndPointService } from '../Services/endpointservice';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

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
            urlPrepend: 'https://',
            endpoint: {
                ip: "",
                description: "",
                id: ""
            }
        }
    }
    processEndPointProps = () => {
        const ip = this.props.endpoint.ip
        const description = this.props.endpoint.description 
        const id = this.props.endpoint.id 
        let urlPrepend = this.state.urlPrepend;
        let newIp = ip;
        if (ip.startsWith("https://")) {
            newIp = ip.substr(8);
            urlPrepend = "https://"
        }
        else if (ip.startsWith("http://")) {
            newIp = ip.substr(7);
            urlPrepend = "http://"
        }
        this.setState({ isModifying: true, urlPrepend: urlPrepend, endpoint: { ip: newIp, description: description, id: id } });
    }
    componentDidUpdate(prevProps,prevState) {
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
    validateUrl = (url, prepend) => {
        let urlcopy = url.toLowerCase();
        let newUrl = prepend + urlcopy;
        const validUrlRegEx = new RegExp('^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$');
        if (validUrlRegEx.test(newUrl))
            return newUrl;
        else
            throw new Error("Site must be a valid web address");
    }

    onClickReset = () => {
        this.setState({ isModifying: false ,endpoint: {ip: "", description: "", id: ""}});
    }

    onSubmitAddEndpoint = async (event) => {
        event.preventDefault();
        const {urlPrepend} = this.state;
        const {ip, description, id} = event.target;
        try {
            this.validateUrl(ip.value,urlPrepend)
        } catch (e) {
            toast.error(e.message);
            return;
        }

        let endPointPost = {
            Ip: urlPrepend + ip.value,
            Description: description.value
        };
        let endPointPut = {
            Id: id.value,
            Ip: urlPrepend + ip.value,
            Description: description.value
        };

        if (this.state.isModifying) {
            this.fetchPutEndPoint(endPointPut).then(res => {
                if (res !== undefined && res.ok) {
                    this.setState({ isModifying: false ,endpoint: {ip: "", description: "", id: ""}});
                    this.props.onPostSuccess();
                }
            })
        } else {
            this.fetchPostEndPoint(endPointPost).then(res => {
                if (res !== undefined && res.ok) {
                    this.setState({endpoint: {ip: "", description: "", id: ""}});
                    this.props.onPostSuccess();
                }
            })
        }
    }
    toggleDropDown = () => {
        const { dropdownOpen } = this.state;
        this.setState({ dropdownOpen: !dropdownOpen });
    }
    onClick_DropDown = (e) => {
        if (e.target.innerText === '')
            return;
        this.setState({ urlPrepend: e.target.innerText });
    }

    render() {
        const {urlPrepend, dropdownOpen } = this.state;
        const ip = this.state.endpoint.ip
        const description = this.state.endpoint.description 
        const id = this.state.endpoint.id 
        return (
            <Form onSubmit={this.onSubmitAddEndpoint} autoComplete="new-password">
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>Site</Label>
                            <InputGroup>
                                <InputGroupButtonDropdown addonType="prepend" id="protocol" name="protocol" onClick={this.onClick_DropDown} isOpen={dropdownOpen} toggle={this.toggleDropDown}>
                                    <DropdownToggle caret id="urlPrepend" name="urlPrepend">{urlPrepend}</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>https://</DropdownItem>
                                        <DropdownItem>http://</DropdownItem>
                                    </DropdownMenu>
                                </InputGroupButtonDropdown>
                                <Input autoComplete="new-password" onChange={e => this.setState({ endpoint: {ip: e.target.value }})} id="ip" name="ip" value={ip} placeholder="www.uptime.com" />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input autoComplete="new-password" onChange={e => this.setState({ endpoint: {description: e.target.value }})} id="description" name="description" value={description}
                                placeholder="Site Description" />
                        </FormGroup>
                        <FormGroup>
                            <Input onChange={e => this.setState({ endpoint: {id: e.target.value }})} id="id" name="id" value={id} hidden={true} />
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
                </Row>
            </Form>
        );
    }
}