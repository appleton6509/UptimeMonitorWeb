import React, { Fragment, PureComponent } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import '../Settings/theme.css';
import PropTypes from 'prop-types';

export class GenericPagination extends PureComponent {
    static propTypes = {
        onPaginationChange: PropTypes.func,
        totalPages: PropTypes.number
    }
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            requestedPage: 1,
            maxPageSize: 25, 
            float: this.props.float ? this.props.float : "right"
        }
    }
    handleClick = (e) => {
        this.PaginationChange(e.target.textContent);
    }
    handleSpecialClick = (value) => {
        const label = value.currentTarget.ariaLabel;
        let requestedPage = Number(this.state.requestedPage);
        const totalPages = Number(this.props.totalPages);
        (label === 'Previous') ? requestedPage = requestedPage - 1 :
            (label === 'Next') ? requestedPage = requestedPage + 1 :
                (label === 'First') ? requestedPage = 1 :
                    (label === 'Last') ? requestedPage = totalPages : 0;
        if (requestedPage === 0) throw Error("invalid page request for pagination")
        this.PaginationChange(requestedPage);
    }
    PaginationChange(requestedPage) {
        const { maxPageSize } = this.state;
        const totalPages = this.props.totalPages;
        let pagination = {
            requestedPage: requestedPage,
            maxPageSize: maxPageSize,
            totalPages: totalPages
        }
        this.setState({ requestedPage: requestedPage });
        this.props.onPaginationChange(pagination)
    }
    renderNumbers = (totalPages) => {
        const requestedPage = Number(this.state.requestedPage);
        const totalDisplayedNums = 9;
        const plusMinus = 4;
        let renderFirstPage = requestedPage - plusMinus;
        let renderLastPage = requestedPage + plusMinus;
        let html = [];

        //selected page is below the first 5 pages to display
        if (requestedPage < 5) {
            renderFirstPage = 1
            renderLastPage = totalDisplayedNums;
        }
        //selected page exceeds total pages
        if (renderLastPage > totalPages) {
            renderFirstPage = (totalPages - (totalDisplayedNums - 1));
            renderLastPage = totalPages;
        }
        let count = renderFirstPage;
        while ((count <= renderLastPage) && (renderLastPage <= totalPages)) {
            let isDisabled = (requestedPage === count) ? true : false;
            html.push(<PaginationItem key={"pageitem-" + count} disabled={isDisabled}><PaginationLink onClick={this.handleClick} key={"pagelink-" + count}>{count}</PaginationLink></PaginationItem>);
            count++;
        }
        return html;
    }
    render() {
        const { totalPages } = this.props;
        const { requestedPage,float } = this.state;
        const disableNext = requestedPage === totalPages ? true : false;
        const disablePrevious = (requestedPage === 1) ? true : false;
        if (!totalPages || totalPages <= 0)
            return <Fragment></Fragment>;
        else 
            return (
                    <Pagination style={{float:float}}>
                        <PaginationItem>
                            <PaginationLink first onClick={this.handleSpecialClick} />
                        </PaginationItem>
                        <PaginationItem disabled={disablePrevious}>
                            <PaginationLink previous onClick={this.handleSpecialClick} />
                        </PaginationItem>
                        {this.renderNumbers(totalPages)}
                        <PaginationItem disabled={disableNext}>
                            <PaginationLink next onClick={this.handleSpecialClick} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink last onClick={this.handleSpecialClick} />
                        </PaginationItem>
                    </Pagination>
            );
    }
}