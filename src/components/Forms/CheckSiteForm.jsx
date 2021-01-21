import { ShadowBox } from '../Design/ShadowBox';
import React, { Component } from 'react'
import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText } from 'reactstrap';
import PropTypes from 'prop-types';

export class CheckSiteForm extends Component {
    static propTypes = {
        onClick: PropTypes.func
    }
    constructor(props) {
        super(props);
    }
    onClick = () => {
        const value = document.getElementById("urlInput").value
        this.props.onClick(value);
    }
    render() {
        return (
            <Form>
                <InputGroup>
                <InputGroupAddon addonType="prepend">
                        <InputGroupText>http://</InputGroupText>
                    </InputGroupAddon>
                    <Input type="url" placeholder="www.mysite.com" id="urlInput"/>
                    <InputGroupAddon addonType="append">
                        <Button color="primary" onClick={this.onClick}>Check!</Button>
                    </InputGroupAddon>
                </InputGroup>
            </Form>
        );
    }
}