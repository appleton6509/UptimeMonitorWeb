import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';
import {FetchService} from '../Services/fetchservice';
import "./FetchTable.css"

/**
 * unqiue number used for keys/id's
 */
let uniqueId = 0;

/**
 * a table component that fetches & renders its own data at timed intervals
 */
export class FetchTable extends PureComponent {
    static propTypes = {
        route: PropTypes.string.isRequired,
        headersMap: PropTypes.object.isRequired,
        hideColumns: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            uniqueId: 0
        }
    }

    componentDidMount() {
        this.fetchData();
        this.fetchTimer = setInterval(() => {
            this.fetchData();
        }, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.fetchTimer);
    }

    componentDidUpdate(prevProps,prevState) {
        if (prevProps.uri !== this.props.uri)
            this.fetchData();
    }

    onClick_GetSelected = (event) => {
        const rowData = this.getRowData(event);
        this.props.onClick(rowData);
    }
    /**
     * gets the row data from a table by using the headers tag and on click event
     * @param {Object} event on click event of row
     * @returns {Object} row data
     */
    getRowData(event) {
        let x = event.target
        if (!x.id)
            return;
        let obj ={}
        while(x != null) {
            obj[x.headers] = x.outerText;
            x = document.getElementById(x.id).nextSibling
        }
        x = event.target
        while(x != null) {
            obj[x.headers] = x.outerText;
            x = document.getElementById(x.id).previousSibling
        }
        return obj;
    }
    async updateTable() {
        await this.fetchData();
    }
    hideColumns() {

    }
    /**
     * fetches the data from API
     */
    async fetchData() {
        const { headersMap, route} = this.props;
        let tableData = {
            pagination: {},
            data: []
        };
        await FetchService.fetchNow(route,"GET")
        .then(json => { //data received
                json.forEach(data => {
                    //map data key/values to header columns to preserve display order
                    var obj = {}
                    for (let [key] of Object.entries(headersMap)) {
                            obj[key] = data[key];
                    }
                    if (Object.keys(obj).length > 0)
                        tableData.data.push(obj);
                });
                this.setState({ data: tableData.data, isLoading: false });
            }).catch(err => {
                console.log(err);
                throw Error(err);
            });
    }
    /**
     * gets a unique id for keys
     */
    getId() {
        uniqueId++
        return uniqueId;
    }
    /**
     * render the header row data
     */
    renderHeaders() {
        const { headersMap, hideColumns } = this.props;
        return Object.values(headersMap)
                .map((header, index) => {
                return <th 
                className={(Object.keys(headersMap)[index] === hideColumns[Object.keys(headersMap)[index]]) ? "hide " + Object.keys(headersMap)[index]  : "" + Object.keys(headersMap)[index] }
                key={"headers-"+index}>{header}</th>;
        });
    }
    /**
     * render the row data
     */
    renderRows() {
        const { data } = this.state;
        const {headersMap, hideColumns} = this.props;
        const headersArray = Object.keys(headersMap);
        return (
            data.map((values, index) => {
                const rawData = Object.values(values);
                return (
                    <tr key={index + "row"} onMouseDown={(e)=> document.getElementById(e.target.id).style="cursor:grabbing"} onMouseUp={(e)=> document.getElementById(e.target.id).style="cursor:grab"} style={{cursor : "grab"}}>
                        {rawData.map((value, cellindex) => {
                                return (<td headers={headersArray[cellindex]} 
                                className={(headersArray[cellindex] === hideColumns[headersArray[cellindex]] ? "hide" : "")} 
                                id={this.getId()} key={"cell-"+cellindex}>{value}</td>);
                        })}
                    </tr>
                );
            })
        );
    }
    render() {
        const { isLoading, data } = this.state;
        if (isLoading && data.length === 0) 
            return (<LoadingSpinner />);
        return (
                <Table  hover>
                    <thead>
                        <tr>
                            {this.renderHeaders()}
                        </tr>
                    </thead>
                    <tbody onClick={this.onClick_GetSelected}>
                        {this.renderRows()}
                    </tbody>
                </Table>
        );
    }
}