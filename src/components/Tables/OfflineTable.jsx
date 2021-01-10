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
            route: "Dashboard/Offline",
            dateColumns: ["lastonline"]
        }
    }

    render() {
        const {route,hideColumns,headersMap,dateColumns} = this.state
        return (
            <Fragment>
                <GenericTable route={route} headersMap={headersMap} hideColumns={hideColumns} dateColumns={dateColumns} />
            </Fragment>
        );
    }
}
