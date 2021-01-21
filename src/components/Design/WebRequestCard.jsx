import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Button } from 'bootstrap';

export class WebRequestCard extends Component {
    static propTypes = {
        url: PropTypes.string,
        isReachable: PropTypes.bool
    }
    constructor(props){
        super(props);
        this.state = {
            url: "",
            isReachable: ""
        }
    }
    render() {
        const {isReachable, url} = this.state;
        return(

        );
    }
}