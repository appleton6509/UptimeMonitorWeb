import { LogsFetchTable } from 'components/Tables/LogsFetchTable';
import React, {Component, Fragment} from 'react';

export class OfflineTable extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const headersMap = {
            "isReachable" : "Status",
            "ip" : "Site",
            "description" : "Description",
            "lastonline" : "Last Seen",
            "id" : "id"
        }
        const hideColumns = {
            "id" : "id"
        }
        return(
        <Fragment>
            <LogsFetchTable route="Dashboard/Offline" headersMap={headersMap} hideColumns={hideColumns}/>
        </Fragment>);
    }
}