import React, { Fragment, PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import { GenericTable } from 'components/Tables/GenericTable';
import { ManageEndPointForm } from 'components/Forms/ManageEndPointForm';
import '../Settings/theme.css';
import { ShadowBox } from 'components/Design/ShadowBox';

export class ManageEndPoints extends PureComponent {
    // static displayName = ManageEndPoints.name;
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            endpoint: { ip: "", description: "", id: "" },
            toggleRefresh: false
        }
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
    onPostSuccess = () => {
        this.setState({toggleRefresh: !this.state.toggleRefresh})
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
        const { endpoint, toggleRefresh } = this.state;
        return (
            <Fragment>
                <Row>
                    <Col lg="6" >
                        <ShadowBox className="p-2">
                            <ManageEndPointForm endpoint={endpoint} onPostSuccess={this.onPostSuccess} />
                        </ShadowBox>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" >
                    <ShadowBox className="p-2">
                            <GenericTable
                                interval={60000}
                                uri={uri}
                                toggleRefresh={toggleRefresh}
                                headersMap={headersMap}
                                hideColumns={hideColumns}
                                onClick={this.onClickGetSelected} />
                        </ShadowBox>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}