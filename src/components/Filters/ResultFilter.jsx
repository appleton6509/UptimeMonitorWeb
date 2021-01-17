import React, { Component, Fragment } from 'react'
import DropDownFilter from '../Design/DropDownFilter';
import PropTypes from 'prop-types';
import uribuilder from '../Utilities/uribuilder';

export class ResultFilter extends Component {
    static propTypes = {
        onSelection: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            filter1SelectedValue: "",
            filter1QueryValue: "",
            filter1Header: "Status",
            filter1Values: ["Online", "Offline"],
            filter1Map: { Online: "true", Offline: "false" },
            filter2SelectedValue: "",
            filter2QueryValue: "",
            filter2Header: "Sort By",
            filter2Values: ["Timestamp", "Latency", "Reachable", "Description", "Site"],
            filter2Map: {
                Timestamp: "Timestamp", Site: "Site", Description: "Description",
                Latency: "Latency", Reachable: "Reachable"
            },
            filter3SelectedValue: "",
            filter3QueryValue: "",
            filter3Header: "Order By",
            filter3Values: ["Ascending", "Descending"],
            filter3Map: { Ascending: "Ascending", Descending: "Descending" }
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
        query.setRoute("")
        filter1QueryValue ? query.addQuery({ Reachable: filter1QueryValue }) : "";
        filter2QueryValue ? query.addQuery({ SortBy: filter2QueryValue }) : "";
        filter3QueryValue ? query.addQuery({ OrderBy: filter3QueryValue }) : "";
        this.props.onSelection(query.getQuery());
    }
    render() {
        const {
            filter1Header, filter1Values, filter1SelectedValue
            , filter2Header, filter2Values, filter2SelectedValue
            , filter3Header, filter3Values, filter3SelectedValue } = this.state;
        return (
            <Fragment>
                  <i className="fa fa-filter"></i>
                <DropDownFilter className="mr-2"
                    header={filter1Header}
                    values={filter1Values}
                    selectedValue={filter1SelectedValue}
                    onClick={this.onClickFilter1}
                />
                <DropDownFilter 
                    className="mr-2" 
                    header={filter2Header}
                    values={filter2Values}
                    selectedValue={filter2SelectedValue}
                    onClick={this.onClickFilter2}
                />
                <DropDownFilter className="mr-2"
                    header={filter3Header}
                    values={filter3Values}
                    selectedValue={filter3SelectedValue}
                    onClick={this.onClickFilter3}
                />
            </Fragment>
        );
    }
}