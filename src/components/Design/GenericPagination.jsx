import React, { PureComponent } from 'react';
import { Container, Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { AuthContext } from '../Authorization/AuthContext';
import { LogsTable } from 'components/Tables/LogsTable';
import '../Settings/theme.css';

export class GenericPagination extends PureComponent {
    // static displayName = ManageEndPoints.name;
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            requestedPage: this.props.requestedPage ? this.props.requestedPage : 1,
            maxPageSize: this.props.maxPageSize,
            totalPages: this.props.totalPages
        }

    }
    handleClick = (e) => {
        let requestedPage = e.target.text;
        this.props.onPageRequest(requestedPage)
    }
    renderNumbers = (pageCount) => {
        let count = 0;
        let html = [];
        while (pageCount > count) {
            count++;
            html.push(<PaginationItem key={"pageitem-" + count}><PaginationLink onClick={this.handleClick} key={"pagelink-" + count} href="#">{count}</PaginationLink></PaginationItem>);
        }
        return html;
    }
    render() {
        const {totalPages} = this.props;
        return (
            <Pagination aria-label="Page navigation example">
                <PaginationItem>
                    <PaginationLink first href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink previous href="#" />
                </PaginationItem>
                {this.renderNumbers(totalPages)}
                <PaginationItem>
                    <PaginationLink next href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink last href="#" />
                </PaginationItem>
            </Pagination>
        );
    }
}