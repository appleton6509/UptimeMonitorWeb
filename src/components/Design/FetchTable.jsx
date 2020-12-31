import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';
import {FetchService} from '../Services/fetchservice';

let uniqueId = 0;

export class FetchTable extends PureComponent {
    static propTypes = {
        route: PropTypes.string.isRequired,
        headersMap: PropTypes.object.isRequired
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
    onClick_GetSelected = (e) => {
        let x = e.target
        if (!x.id)
            return;

        let obj ={}
        while(x != null) {
            obj[x.headers] = x.outerText;
            x = document.getElementById(x.id).nextSibling
        }
        x = e.target
        while(x != null) {
            obj[x.headers] = x.outerText;
            x = document.getElementById(x.id).previousSibling
        }
        this.props.onClick(obj);
    }
    fetchData() {
        const { headersMap, route } = this.props;

        let tableData = {
            pagination: {},
            data: []
        };
        FetchService.fetchNow(route,"GET")
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
    getId() {
        uniqueId++
        return uniqueId;
    }
    renderHeaders() {
        const { headersMap } = this.props;
        return Object.values(headersMap).map((header, index) => {
            return <th key={"headers-"+index}>{header}</th>;
        });
    }

    renderRows() {
        const { data } = this.state;
        const {headersMap} = this.props;
        const headersArray = Object.keys(headersMap);
        return (
            data.map((values, index) => {
                const rawData = Object.values(values);
                return (
                    <tr key={index + "row"} onMouseDown={(e)=> document.getElementById(e.target.id).style="cursor:grabbing"} onMouseUp={(e)=> document.getElementById(e.target.id).style="cursor:grab"} style={{cursor : "grab"}}>
                        {rawData.map((value, cellindex) => {
                            return (<td headers={headersArray[cellindex]} id={this.getId()} key={"cell-"+cellindex}>{value}</td>);
                        })}
                    </tr>
                );
            })
        );
    }

    render() {
        const { isLoading, data } = this.state;

        if (isLoading && data.length === 0) {
            return (<LoadingSpinner />);
        }
        
        return (
                <Table onClick={this.onClick_GetSelected} hover>
                    <thead>
                        <tr>
                            {this.renderHeaders()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </Table>
        );
    }
}