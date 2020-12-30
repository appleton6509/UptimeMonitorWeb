import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import PropType from 'prop-types';

export default class LoadingSpinner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: this.props.height,
            type: this.props.type,
            size: this.props.size
        }
    }

    renderSpinner() {
        const { type, size } = this.state;
        const height = { height: this.state.height }
        
        return (
            <div className="d-flex justify-content-center" style={height}>
                <div className="align-self-center">
                    <Spinner type={type} size={size} color="warning" />
                    <Spinner type={type} size={size} />
                    <Spinner type={type} size={size} color="danger" />
                </div>
            </div>
        );
    }
    render() {
        return this.renderSpinner();
    }
}
LoadingSpinner.propTypes = {
    type: PropType.string,
    size: PropType.string,
    height: PropType.string,
}
LoadingSpinner.defaultProps = {
    height: "12rem",
    type: "grow",
    size: "sm"
}