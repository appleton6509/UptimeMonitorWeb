import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

export default class LoadingSpinner extends Component {
    static propTypes = {
        type: PropTypes.string,
        size: PropTypes.string,
        height: PropTypes.string,
    }
    constructor(props) {
        super(props);

        this.state = {
            height: this.props.height,
            type: this.props.type,
            size: this.props.size
        }
    }

    renderSpinner() {

    }
    render() {
       const { type, size } = this.state;
            const height = { height: this.state.height }
            return (
                <div className="d-flex justify-content-center" style={height}>
                    <div className="align-self-center text-center">
                        {this.props.children}
                        <Spinner type={type} size={size} color="warning" />
                        <Spinner type={type} size={size} />
                        <Spinner type={type} size={size} color="danger" />
                    </div>
                </div>
            );
    }
}
LoadingSpinner.defaultProps = {
    height: "12rem",
    type: "grow",
    size: "sm"
}