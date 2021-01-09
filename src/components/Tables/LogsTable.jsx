import React, { Fragment, PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import uribuilder from '../Utilities/uribuilder';
import { GenericTable } from './GenericTable';
import { ResultFilter } from 'components/Filters/ResultFilter';

export class LogsTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            uri: "Result/logs",
            route: "Result/logs",
            filter: "",
            headers: {
                "id": "id",
                "timeStamp": "Timestamp",
                "ip": "Site",
                "description": "Description",
                "isReachable": "Status",
                "latency": "Latency",
                "status": "Message"
            },
            hideColumns: {
                "id": "id"
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state)
            this.buildQuery();
    }
    buildQuery = () => {
        const { route, filter } = this.state;
        const { maxPageSize, requestedPage } = this.props;
        const query = new uribuilder();
        query.setRoute(route);
        if (maxPageSize && requestedPage) 
            query.addQuery({ maxPageSize: maxPageSize, requestedPage: requestedPage });
        if (filter) 
            query.addExistingQuery(filter);
        this.setState({ uri: query.build() });
    }
    handleFilterChange = (filterQuery) => {
        this.setState({filter: filterQuery});
    }
    render() {
        const { headers, hideColumns, uri } = this.state;
        return (
            <Fragment>
                <Row>
                    <Col lg="12">
                        <ResultFilter onSelection={this.handleFilterChange}/>
                    </Col>
                </Row>
                <Row><Col>&nbsp;</Col></Row>
                <div className="text-center">
                    <GenericTable
                        interval={60000}
                        route={uri}
                        headersMap={headers}
                        hideColumns={hideColumns}
                        />
                </div>

            </Fragment>
        );
    }
}
