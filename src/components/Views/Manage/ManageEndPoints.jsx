import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { AuthContext } from '../../Authorization/AuthContext';
import { GenericTable } from 'components/Generic/Tables/GenericTable';
import { ManageEndPointForm } from 'components/Views/Manage/ManageEndPointForm';
import 'components/Settings/theme.css';
import { ShadowBox } from 'components/Generic/Design/ShadowBox';


export class ManageEndPoints extends Component {
    // static displayName = ManageEndPoints.name;
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            endpoint: {
                ip: "",
                description: "",
                id: "", 
                protocol: "", 
                notifyonfailure: "", 
                userid: "" 
            },
            refreshChild: false
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps !== this.props || nextState !== this.state) {
            if (nextState.toggleRefresh === this.state.toggleRefresh)
                return true;
        }
        return false;
    }
    onClickGetSelected = (epobject) => {
        if (!epobject) return;
        //values in EP are case sensitive
        const ep = {
            id: epobject["id"],
            ip: epobject["ip"],
            description: epobject["description"],
            protocol: epobject["protocol"],
            userid: epobject["userId"],
            notifyonfailure: epobject["notifyOnFailure"]
        }
        this.setState({endpoint: {...ep}});
    }
    toggleRefresh = () => {
        const refreshChild = !this.state.refreshChild;
        this.setState({ refreshChild: refreshChild})
    }
    render() {
        const protocols = ["http","https", "ftp", "ftps", "sftp", "ssh", "telnet"];
        const headersMap = {
            "id": "id",
            "ip": "Site",
            "description": "Description",
            "protocol" : "Protocol",
            "userId" : "userId",
            "notifyOnFailure": "Notify?"
        }
        const hideColumns = {
            "id": "id",
            "userId": "userId"
        }
        const uri = "EndPoints";
        const { endpoint, refreshChild } = this.state;
        return (
            <Fragment>
                <Row>
                    <Col lg="6" >
                        <ShadowBox className="p-2 mb-2">
                            <ManageEndPointForm endpoint={endpoint} protocols={protocols} onPostSuccess={this.toggleRefresh} />
                        </ShadowBox>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" >
                        <ShadowBox className="p-2 text-center">
                            <GenericTable
                                interval={160000}
                                uri={uri}
                                showDeleteIcon
                                headersMap={headersMap}
                                hideColumns={hideColumns}
                                toggleRefresh={refreshChild}
                                onClick={this.onClickGetSelected} />
                        </ShadowBox>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}