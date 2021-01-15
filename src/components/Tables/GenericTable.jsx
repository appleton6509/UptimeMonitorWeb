import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import LoadingSpinner from '../Design/LoadingSpinner';
import { FetchService } from '../Services/fetchservice';
import './GenericTable.css';
import { DataToHeaderConverter } from 'components/Tables/DataToHeaderConverter';
import { DataToRowConverter } from 'components/Tables/DataToRowConverter';
/**
 * a table component that fetches & renders its own data at timed intervals
 */
export class GenericTable extends Component {
    static propTypes = {
        uri: PropTypes.string.isRequired,
        headersMap: PropTypes.object.isRequired,
        hideColumns: PropTypes.object,
        dateColumns: PropTypes.array,
        onClick: PropTypes.func,
        onDataLoad: PropTypes.func,
        onPaginationChange: PropTypes.func,
        interval: PropTypes.number.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true
        }
    }
    componentDidMount() {
        this.fetchTimer = setInterval(() => {
            this.fetchData();
        }, this.props.interval);
        this.fetchData();
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.uri !== this.props.uri ||
            nextState.data !== this.state.data ||
            nextState.isLoading !== this.state.isLoading ||
            nextProps.onPaginationChange !== this.props.onPaginationChange)
            return true;
        return false;
    }
    componentWillUnmount() {
        clearInterval(this.fetchTimer);
    }

    componentDidUpdate(prevProps, _prevState) {
        if (this.props.uri !== prevProps.uri) {
                this.fetchData();
            }

    }

    onClick_GetSelected = (event) => {
        const rowData = this.getSelectedRowData(event);
        if (this.props.onClick !== undefined && rowData)
            this.props.onClick(rowData);
    }
    /**
     * gets the row data from a table by using the headers tag and on click event
     * @param {Object} event on click event of row
     * @returns {Object} row data
     */
    getSelectedRowData(event) {
        let x = event.target
        if (!x.id)
            return;
        let obj = {}
        while (x != null) {
            obj[x.headers] = x.outerText;
            x = document.getElementById(x.id).nextSibling
        }
        x = event.target
        while (x != null) {
            obj[x.headers] = x.outerText;
            x = document.getElementById(x.id).previousSibling
        }
        return obj;
    }
  
    setPagination = (page) => {
        if (page) {
            const pageData = JSON.parse(page);
            const pagination = {
                requestedPage: Number(pageData.RequestedPage),
                maxPageSize: Number(pageData.MaxPageSize),
                totalPages: Number(pageData.TotalPages)
            }
            this.props.onPaginationChange(pagination);
        }
    }
    handleOnDataLoad = (firstDataRow) => {
        if (this.props.onDataLoad)
            this.props.onDataLoad(firstDataRow);
    }

    /**
     * fetches the data from API
     */
    fetchData = async () => {
        const { headersMap, uri } = this.props;
        if (!uri)
            return;
        let tableData = {data:[]}
        let headers;
        await FetchService.fetchNow(uri, "GET")
            .then(res => {
                headers = res.headers.get("X-Pagination");
                return res.json();
            })
            .then(json => { //data received
                json.forEach(data => {
                    //  map data key/values to header columns to preserve display order
                    var obj = {}
                    for (let [key] of Object.entries(headersMap)) 
                        obj[key] = data[key];

                    if (Object.keys(obj).length > 0)
                        tableData.data.push(obj);
                })
            })
            .then(() => {
                this.setState({ data: tableData.data, isLoading: false })
            })
            .catch(err => {
                console.log("fetch error: " + err.message.code + " - " + err.message.message);
            });
        this.setPagination(headers);
        this.handleOnDataLoad(tableData.data[0]);
    }
    render() {
        const { isLoading, data, uri} = this.state;
        if (isLoading && data.length === 0)
            return (<LoadingSpinner />);
        const { headersMap, hideColumns, dateColumns } = this.props;
        return (
                <Table className="table-small" hover responsive id="table">
                    <thead>
                        <tr>
                            <DataToHeaderConverter headersMap={headersMap} hideColumns={hideColumns}/>
                        </tr>
                    </thead>
                    <tbody onClick={this.onClick_GetSelected}>
                        <DataToRowConverter headersMap={headersMap} hideColumns={hideColumns} dateColumns={dateColumns} data={data}/>
                    </tbody>
                </Table>
        );
    }
}
GenericTable.defaultProps = {
    interval: 60000
}