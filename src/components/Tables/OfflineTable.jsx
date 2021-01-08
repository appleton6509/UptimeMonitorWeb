import React, { Component, Fragment } from 'react';
import { GenericTable } from './GenericTable';

export class OfflineTable extends Component {
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
                "id": "id"
            },
            route: "Dashboard/Offline"
        }
    }

    render() {
        const headersMap = {
            "isReachable": "Status",
            "ip": "Site",
            "description": "Description",
            "lastonline": "Last Seen",
            "id": "id"
        }
        const hideColumns = {
            "id": "id"
        }

        return (
            <Fragment>
                <GenericTable route="Dashboard/Offline" headersMap={headersMap} hideColumns={hideColumns} />
            </Fragment>
        );
    }
}
