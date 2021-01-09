import React, { PureComponent } from 'react';
import {  Container, Row, Col } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import { LogsTable } from 'components/Tables/LogsTable';
import '../Settings/theme.css';
import { GenericPagination } from 'components/Design/GenericPagination';

export class ResultLogs extends PureComponent {
    // static displayName = ManageEndPoints.name;
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            pagination :{
                requestedPage: 1,
                maxPageSize: 25,
                totalPages: 1
            }
        }
    }
    handlePagination = (pagination) => {
        this.setState({pagination: {...pagination}});
    }
    render() {
        const {totalPages} = this.state.pagination;
        return (
            <Container>
                <Row>
                    <Col lg="12" >
                        <div className="shadow mt-3 theme1-bg theme1-border">
                                <LogsTable onPaginationReceived={this.handlePagination} {...this.state.pagination}/>
                                <GenericPagination onPageRequest={this.handlePagination} totalPages={totalPages} />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}