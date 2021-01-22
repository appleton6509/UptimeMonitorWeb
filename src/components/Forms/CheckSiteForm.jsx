import React, { Component } from 'react'
import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText } from 'reactstrap';
import PropTypes from 'prop-types';

export class CheckSiteForm extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        className: PropTypes.string
    }
    constructor(props) {
        super(props);
    }
    onClick = () => {
        const value = document.getElementById("urlInput").value
        this.props.onClick(value);
    }
    render() {
        const {className} = this.props;
        return (
            <Form className={className}>
                <InputGroup>
                    <Input type="url" placeholder="www.mysite.com" id="urlInput"/>
                    <Button color="primary" onClick={this.onClick}>Check!</Button>
                </InputGroup>

            </Form>
        );
    }
}