import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import LoadingSpinner from '../Design/LoadingSpinner';
import { FetchService } from '../Services/fetchservice';
import './GenericTable.css';
import { EndPointService } from '../Services/endpointservice';
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
        showDeleteIcon: PropTypes.bool,
        dateColumns: PropTypes.array,
        showHeaders: PropTypes.bool,
        toggleRefresh: PropTypes.bool,
        onClick: PropTypes.func,
        onDataLoad: PropTypes.func,
        onPaginationChange: PropTypes.func,
        interval: PropTypes.number.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            data: [{id:"",description:""}],
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
            nextProps.onPaginationChange !== this.props.onPaginationChange ||
            nextProps.toggleRefresh !== this.props.toggleRefresh)
            return true;
         return false;
    }
    componentWillUnmount() {
        clearInterval(this.fetchTimer);
    }

    componentDidUpdate(prevProps, _prevState) {
        if (this.props.uri !== prevProps.uri || 
            this.props.toggleRefresh !== prevProps.toggleRefresh) {
            this.fetchData();
        }
    }

    onClick_GetSelected = (rowData) => {
        if (this.props.onClick !== undefined && rowData) {
            this.props.onClick(rowData);
        }
    }
    onDeleteClick = (rowData) => {
        if (!rowData)
            return;
        this.deleteRow(rowData);
    }

    deleteRow = (rowData) => {
        let workingData = this.state.data.map(x => x);
        let itemToDeleteIndex = this.state.data.findIndex(x=>x.id === rowData["id"])
        let deletedRow = workingData.splice(itemToDeleteIndex,1);
        EndPointService.delete(rowData["id"]);
        this.setState({data: workingData});
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
        let formatteddata = [] 
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
                        formatteddata.push(obj);
                })
            })
            .then(() => {
                this.setState({ data: formatteddata, isLoading: false })
            })
            .catch(err => {
                console.log(err);
            });
        this.setPagination(headers);
    }
    render() {
        const { isLoading, data, uri } = this.state;
        const { headersMap, hideColumns, dateColumns, showHeaders, showDeleteIcon, toggleRefresh } = this.props;
        if (isLoading && data.length === 0 && toggleRefresh)
            return (<LoadingSpinner />);
        return (
            <Table className="table-small" hover responsive id="table">
                {showHeaders ?
                    <thead>
                        <tr><DataToHeaderConverter headersMap={headersMap} hideColumns={hideColumns} /></tr>
                    </thead> : <div></div>}
                <tbody >
                    <DataToRowConverter
                        onClickGetRow={this.onClick_GetSelected} headersMap={headersMap}
                        hideColumns={hideColumns} dateColumns={dateColumns} data={data}
                        showDeleteIcon={showDeleteIcon}
                        onDeleteClick={this.onDeleteClick}
                    />
                </tbody>
            </Table>
        );
    }
}
GenericTable.defaultProps = {
    interval: 60000,
    showHeaders: true,
    showDeleteIcon: false
}