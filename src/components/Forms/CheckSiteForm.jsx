import React, { Component } from 'react'
import { Button, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown } from 'reactstrap';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

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
        let urlcopy = url.toLowerCase();
        let newUrl = prepend + urlcopy;
        const validUrlRegEx = new RegExp('^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$');
        if (validUrlRegEx.test(newUrl))
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
                            <DropdownItem divider disabled astupid/>
                            <DropdownItem header disabled astupid>Also Avaliable:</DropdownItem>
                            <DropdownItem disabled astupid>ftp</DropdownItem>
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