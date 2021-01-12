import React, { Component, Fragment } from 'react';
import { Container } from 'reactstrap';
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
            uri: "EndPoints/Offline",
            dateColumns: ["lastonline"]
        }
    }

    render() {
        return (
                <GenericTable {...this.state}/>
        );
    }
}
