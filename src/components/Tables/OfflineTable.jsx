import { FetchTable } from 'components/Design/FetchTable';
import React, {Component, Fragment} from 'react';

export class OfflineTable extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const headersMap = {
            "ip" : "IP /DNS",
            "IsReachable" : "IsOnline",
            "description" : "DESCRIPTION",
            "id" : "id"
        }
        const hideColumns = {
            "id":"id",
            "IsReachable":"IsReachable"
        }
        return(
        <Fragment>
            <FetchTable route="Dashboard/Offline" headersMap={headersMap} hideColumns={hideColumns}/>
        </Fragment>);
    }
}