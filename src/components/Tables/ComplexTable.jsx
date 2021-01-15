import React, { Fragment, PureComponent } from 'react';
import uribuilder from '../Utilities/uribuilder';
import { GenericTable } from './GenericTable';
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
        const { route,filter } = this.props;
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

    handlePagination = (page) => {
        this.setState({ pagination: page });
    }
    handleOnClick = (rowData) => {
        if (this.props.onClick)
            this.props.onClick(rowData);
    }

    render() {
        const { uri, pagination } = this.state; 
        const { route } = this.props
        if (!route)
            return "";
        else
            return (
                <Fragment>
                    {this.props.children}
                    <div className="text-center">
                            <GenericTable interval={60000} uri={uri} onClick={this.handleOnClick} onPaginationChange={this.handlePagination} {...this.props}/>
                            <GenericPagination onPaginationChange={this.handlePagination} totalPages={pagination.totalPages} />
                            <br/> 
                    </div>
                </Fragment>
            );
    }
}
