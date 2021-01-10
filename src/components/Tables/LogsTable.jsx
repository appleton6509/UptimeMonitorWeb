import React, { Fragment, PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import uribuilder from '../Utilities/uribuilder';
import { GenericTable } from './GenericTable';
import { ResultFilter } from 'components/Filters/ResultFilter';
import { GenericPagination } from 'components/Design/GenericPagination';
import moment from 'moment';

export class LogsTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            uri: "",
            route: "Result/logs",
            filter: "",
            pagination: {
                requestedPage: 1,
                maxPageSize: 25,
                totalPages: 0
            },
            headers: {
                "id": "id",
                "timeStamp": "",
                "ip": "Site",
                "description": "Description",
                "isReachable": "",
                "latency": "Latency",
                "status": "Message"
            },
            hideColumns: {
                "id": "id"
            },
            dateColumns: ["timeStamp"]
        }
    }
    componentDidMount() {
        this.setQuery();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state)
            this.setQuery();
    }
    setQuery = () => {
        this.setState({ uri: this.buildQuery() });
    }
    buildQuery = () => {
        const { route, filter, } = this.state;
        const { maxPageSize, requestedPage } = this.state.pagination;
        const query = new uribuilder();
        query.setRoute(route);
        if (maxPageSize && requestedPage)
            query.addQuery({ maxPageSize: maxPageSize, requestedPage: requestedPage });
        if (filter)
            query.addExistingQuery(filter);
        let buildQuery = query.build();
        return buildQuery;
    }
    handleFilterChange = (filterQuery) => {
        this.setState({ filter: filterQuery });
    }
    handlePagination = (page) => {
        this.setState({ pagination: page });
    }

    render() {
        const { headers, hideColumns, uri, pagination, dateColumns } = this.state;

        return (
            <Fragment>
                <Row>
                    <Col lg="12">
                        <ResultFilter onSelection={this.handleFilterChange} />
                        <GenericPagination onPaginationChange={this.handlePagination} totalPages={pagination.totalPages} />
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" style={{}}>
    
                    </Col>
                </Row>
                <div className="text-center">
                    {uri ?
                        <GenericTable interval={60000} route={uri} headersMap={headers} dateColumns={dateColumns}
                            hideColumns={hideColumns} onPaginationChange={this.handlePagination} /> : ""}
                </div>
            </Fragment>
        );
    }
}
