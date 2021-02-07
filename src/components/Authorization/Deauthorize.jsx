import React, {Component } from 'react';
import { AuthContext } from '../Authorization/AuthContext';

export class Deauthorize extends Component {
    static contextType = AuthContext;
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.context.unauthorized();
        window.location.replace("/SignIn");
    }
    render() {
        return(<div></div>);
    }
}