import { FetchTable } from 'components/Tables/FetchTable';
import React, {Component, Fragment} from 'react';

export class OfflineTable extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const headersMap = {
            "IsReachable" : "IsReachable",
            "ip" : "Site",
            "description" : "Name",
            "id" : "id"
        }
        const hideColumns = {
            "id" : "id"
        }
        return(
        <Fragment>
            <FetchTable route="Dashboard/Offline" headersMap={headersMap} hideColumns={hideColumns}/>
        </Fragment>);
    }
}