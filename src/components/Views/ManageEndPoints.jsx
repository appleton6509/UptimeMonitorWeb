import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import { GenericTable } from 'components/Tables/GenericTable';
import { ManageEndPointForm } from 'components/Forms/ManageEndPointForm';
import '../Settings/theme.css';
import { ShadowBox } from 'components/Design/ShadowBox';


export class ManageEndPoints extends Component {
    // static displayName = ManageEndPoints.name;
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            endpoint: { ip: "", description: "", id: "" },
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
        const ep = {
            id: epobject["id"],
            ip: epobject["ip"],
            description: epobject["description"]
        }
        this.setState({ endpoint: { ip: ep.ip, id: ep.id, description: ep.description } });
    }
    toggleRefresh = () => {
        const refreshChild = !this.state.refreshChild;
        this.setState({ refreshChild: refreshChild})
    }
    render() {
        const headersMap = {
            "id": "id",
            "ip": "Site",
            "description": "Description"
        }
        const hideColumns = {
            "id": "id"
        }
        const uri = "EndPoints";
        const { endpoint, refreshChild } = this.state;
        return (
            <Fragment>
                <Row>
                    <Col lg="6" >
                        <ShadowBox className="p-2 mb-2">
                            <ManageEndPointForm endpoint={endpoint} onPostSuccess={this.toggleRefresh} />
                        </ShadowBox>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" >
                        <ShadowBox className="p-2">
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