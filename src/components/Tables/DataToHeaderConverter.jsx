import React, { Component } from 'react';
import PropTypes from 'prop-types';
export class DataToHeaderConverter extends Component {
    static propTypes = {
        headersMap: PropTypes.object,
        hideColumns: PropTypes.object
    }
    constructor(props) {
        super(props);
    }
    render() {
        const { headersMap, hideColumns } = this.props;
        if (!headersMap)
            return "";
        else
            return Object.values(headersMap)
                .map((header, index) => {
                    return <th className={(Object.keys(headersMap)[index] === hideColumns[Object.keys(headersMap)[index]]) ? "hide " + Object.keys(headersMap)[index] : "" + Object.keys(headersMap)[index]}
                        key={"headers-" + index}>{header}</th>;
                })
    }
}