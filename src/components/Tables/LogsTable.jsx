import React, { Fragment, PureComponent } from 'react';
import DropDownFilter from 'components/Design/DropDownFilter';
import { Row, Col, Table } from 'reactstrap';
import { FetchTable } from './FetchTable';
import uribuilder from '../Utilities/uribuilder';

export class LogsTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            filter1SelectedValue: "",
            filter1QueryValue: "",
            filter1Header: "Online/Offline",
            filter1Values: ["Online", "Offline"],
            filter1Map: { Online: "true", Offline: "false" },
            filter2SelectedValue: "",
            filter2QueryValue: "",
            filter2Header: "Order By",
            filter2Values: ["Ascending", "Descending"],
            filter2Map: { Ascending: "Ascending", Descending: "Descending" },
            filter3SelectedValue: "",
            filter3QueryValue: "",
            filter3Header: "Sort By",
            filter3Values: ["Timestamp", "Latency", "Reachable", "Description", "Site"],
            filter3Map: { Timestamp: "Timestamp", Site: "Site", Description: "Description", Latency: "Latency", Reachable: "Reachable" },
            uri: "Result/logs",
            route: "Result/logs",
            headers: {
                "id": "id",
                "timeStamp": "Timestamp",
                "ip": "Site",
                "description": "Description",
                "IsReachable": "Online",
                "latency": "Latency",
                "status": "Status"
            },
            hideColumns: {
                "id": "id"
            }
        }
    }
    onClickFilter1 = (selectedValue) => {
        const queryValue = this.state.filter1Map[selectedValue];
        this.setState({ filter1SelectedValue: selectedValue, filter1QueryValue: queryValue });
    }
    onClickFilter2 = (selectedValue) => {
        const queryValue = this.state.filter2Map[selectedValue];
        this.setState({ filter2SelectedValue: selectedValue, filter2QueryValue: queryValue });
    }
    onClickFilter3 = (selectedValue) => {
        const queryValue = this.state.filter3Map[selectedValue];
        this.setState({ filter3SelectedValue: selectedValue, filter3QueryValue: queryValue });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state)
            this.buildQuery();
    }
    buildQuery = () => {
        const { filter1QueryValue, filter2QueryValue, filter3QueryValue, route } = this.state;
        const query = new uribuilder()
        query.setRoute(route)
        if (filter1QueryValue)
            query.addQuery({ Reachable: filter1QueryValue });
        if (filter2QueryValue)
            query.addQuery({ OrderBy: filter2QueryValue })
        if (filter3QueryValue)
            query.addQuery({ SortBy: filter3QueryValue })

        this.setState({ uri: query.build() });
    }
    render() {
        const { headers, hideColumns, uri
            , filter1Header, filter1Values, filter1SelectedValue
            , filter2Header, filter2Values, filter2SelectedValue
            , filter3Header, filter3Values, filter3SelectedValue } = this.state;

        return (
            <Fragment>
                <Row>
                    <Col lg="12">
                        <DropDownFilter
                            header={filter1Header}
                            values={filter1Values}
                            selectedValue={filter1SelectedValue}
                            onClick={this.onClickFilter1}
                        />
                        {"   "}
                        <DropDownFilter
                            header={filter2Header}
                            values={filter2Values}
                            selectedValue={filter2SelectedValue}
                            onClick={this.onClickFilter2}
                        />
                        {"   "}
                        <DropDownFilter
                            header={filter3Header}
                            values={filter3Values}
                            selectedValue={filter3SelectedValue}
                            onClick={this.onClickFilter3}
                        />
                    </Col>
                </Row>
                <Row><Col>&nbsp;</Col></Row>
                <div className="text-center">
                    <FetchTable
                        interval={60000}
                        route={uri}
                        headersMap={headers}
                        hideColumns={hideColumns} />
                </div>
            </Fragment>
        );
    }
}
