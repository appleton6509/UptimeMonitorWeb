import React, { Component } from 'react'
import { Button, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown } from 'reactstrap';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import validator from 'components/Utilities/validator';

export class CheckSiteForm extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        className: PropTypes.string

    }
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            urlPrepend: 'https://'
        }
    }
    onClick = (e) => {
        const { urlPrepend } = this.state;
        const rawUrl = document.getElementById("urlInput").value
        try {
            let validUrl = this.validateUrl(rawUrl, urlPrepend);
            if (validUrl)
                this.props.onClick(validUrl);
        } catch (e) {
            toast.error(e.message);
        }
    }
    validateUrl = (url, prepend) => {
        let newUrl = prepend + url.toLowerCase();
        let isValid = validator.isValidUrl(newUrl);
        if (isValid)
            return newUrl;
        else
            throw new Error("Invalid web address - " + newUrl);
    }
    toggleDropDown = () => {
        const { dropdownOpen } = this.state;
        this.setState({ dropdownOpen: !dropdownOpen });
    }
    onClick_DropDown = (e) => {
        if (e.target.innerText === '' || (e.target.innerText !== "https://" && e.target.innerText !== "http://"))
            return;

        this.setState({ urlPrepend: e.target.innerText });
    }
    render() {
        const { className } = this.props;
        const { dropdownOpen, urlPrepend } = this.state;
        return (
            <Form className={className}>
                <InputGroup>
                    <InputGroupButtonDropdown addonType="prepend" onClick={this.onClick_DropDown} isOpen={dropdownOpen} toggle={this.toggleDropDown}>
                        <DropdownToggle caret>{urlPrepend}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>https://</DropdownItem>
                            <DropdownItem>http://</DropdownItem>
                            <DropdownItem divider disabled />
                            <DropdownItem header disabled >Also Avaliable:</DropdownItem>
                            <DropdownItem disabled >ftp</DropdownItem>
                            <DropdownItem disabled>ftps</DropdownItem>
                            <DropdownItem disabled>sftp</DropdownItem>
                            <DropdownItem disabled>telnet</DropdownItem>
                            <DropdownItem disabled>ssh</DropdownItem>
                            <DropdownItem disabled>& More!</DropdownItem>
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                    <Input type="url" placeholder="www.mysite.com" id="urlInput" />
                    <InputGroupAddon addonType="append">
                        <Button color="primary" onClick={this.onClick}>Check!</Button>
                    </InputGroupAddon>
                </InputGroup>
            </Form>
        );
    }
}