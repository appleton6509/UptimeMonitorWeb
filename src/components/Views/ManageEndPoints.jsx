import React, { PureComponent } from 'react';
import { Container, Row, Col} from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import { GenericTable } from 'components/Tables/GenericTable';
import { ManageEndPointForm } from 'components/Forms/ManageEndPointForm';

export class ManageEndPoints extends PureComponent {
    // static displayName = ManageEndPoints.name;
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            endpoint: { ip:"",description:"",id:""}
        }
    }

    onClickGetSelected = (epobject) => {
        const ep = {
            id: epobject["id"],
            ip: epobject["ip"],
            description: epobject["description"]
        }
        this.setState({endpoint: {ip: ep.ip, id: ep.id,description: ep.description} });
    }
    onPostSuccess =() => {

    }

    render() {
        const headers = {
            "id": "id",
            "ip": "Site",
            "description": "Description"
        }
        const hideColumns = {
            "id": "id"
        }
        const { endpoint } = this.state;
        return (
            <Container>
                <Row>
                    <Col lg="12" >
                        <div className="shadow p-3 mt-4">
                            <ManageEndPointForm endpoint={endpoint} onPostSuccess={this.onPostSuccess} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" >
                        <div className="shadow mt-4 text-center">
                            <GenericTable
                                interval={60000}
                                route="EndPoints"
                                headersMap={headers}
                                hideColumns={hideColumns}
                                onClick={this.onClickGetSelected} />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}