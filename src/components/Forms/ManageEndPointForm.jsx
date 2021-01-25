import React, { Component } from 'react';
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
            urlPrepend: 'https://'
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.endpoint !== this.props.endpoint) {
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
        this.setState({ isModifying: false });
    }

    onSubmitAddEndpoint = async (event) => {
        event.preventDefault();
        const {urlPrepend} = this.state;
        let ip;
        let id = event.target.id.value
        let description = event.target.description.value
        
        try {
            ip = this.validateUrl(event.target.ip.value,urlPrepend)
        } catch (e) {
            toast.error(e.message);
            return;
        }

        let endPointPost = {
            Ip: ip,
            Description: description
        };
        let endPointPut = {
            Id: id,
            Ip: ip,
            Description: description
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
        const {urlPrepend, dropdownOpen} = this.state;
        return (
            <Form onSubmit={this.onSubmitAddEndpoint}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>Site</Label>
                            <InputGroup>
                                <InputGroupButtonDropdown addonType="prepend" id="protocol" name="protocol" onClick={this.onClick_DropDown} isOpen={dropdownOpen} toggle={this.toggleDropDown}>
                                    <DropdownToggle caret>{urlPrepend}</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>https://</DropdownItem>
                                        <DropdownItem>http://</DropdownItem>
                                    </DropdownMenu>
                                </InputGroupButtonDropdown>
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
                    </Col>
                </Row>
            </Form>
        );
    }
}