import React, { Fragment, PureComponent } from 'react';
import { Container, Row, Col} from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import { GenericTable } from 'components/Tables/GenericTable';
import { ManageEndPointForm } from 'components/Forms/ManageEndPointForm';
import '../Settings/theme.css';

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
        const headersMap = {
            "id": "id",
            "ip": "Site",
            "description": "Description"
        }
        const hideColumns = {
            "id": "id"
        }
        const uri = "EndPoints";
        const { endpoint } = this.state;
        return (
            <Fragment>
                <Row>
                    <Col lg="6" >
                        <div className="shadow p-2 theme1-bg theme1-border">
                            <ManageEndPointForm endpoint={endpoint} onPostSuccess={this.onPostSuccess} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" >
                        <div className="shadow mt-3 text-center theme1-bg theme1-border">
                            <GenericTable
                                interval={60000}
                                uri={uri}
                                headersMap={headersMap}
                                hideColumns={hideColumns}
                                onClick={this.onClickGetSelected} />
                        </div>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}