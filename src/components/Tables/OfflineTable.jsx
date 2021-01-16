import React, { Component, Fragment } from 'react';
import { GenericTable } from './GenericTable';
import PropTypes from 'prop-types';
export class OfflineTable extends Component {
static propTypes = {
    showHeaders: PropTypes.bool
}
    constructor(props) {
        super(props);
        this.state = {
            headersMap: {
                "isReachable": "Status",
                "ip": "Site",
                "description": "Description",
                "lastonline": "Last Seen",
                "id": "id"
            },
            hideColumns: {
                "id": "id",
                "lastonline": "lastonline",
                "ip":"ip"
            },
            uri: "EndPoints/Offline",
            dateColumns: ["lastonline"]
        }
    }

    render() {
        return (
                <GenericTable {...this.props} {...this.state}>{this.props.children}</GenericTable>
        );
    }
}
OfflineTable.defaultProps = {
    showHeaders: true
}
