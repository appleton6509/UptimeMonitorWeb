import React, { Fragment, PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import uribuilder from '../Utilities/uribuilder';
import { GenericTable } from './GenericTable';
import { ResultFilter } from 'components/Filters/ResultFilter';
import { GenericPagination } from 'components/Design/GenericPagination';
import PropTypes from "prop-types"
export class ComplexTable extends PureComponent {
    static propTypes = {
        route: PropTypes.string.isRequired,
        headersMap: PropTypes.object.isRequired,
        hideColumns: PropTypes.object,
        dateColumns: PropTypes.array,
        onClick: PropTypes.func,
        onPaginationChange: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.state = {
            uri: "",
            filter: "",
            pagination: {
                requestedPage: 1,
                maxPageSize: 25,
                totalPages: 0
            }
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
        const { filter } = this.state;
        const { route } = this.props;
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
        const { uri, pagination } = this.state;
        const { route } = this.props
        if (!route)
            return "";
        else
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
                            <GenericTable interval={60000} uri={uri} onPaginationChange={this.handlePagination} {...this.props}/>
                    </div>
                </Fragment>
            );
    }
}
