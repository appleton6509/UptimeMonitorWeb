import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';
import {FetchService} from '../Services/fetchservice';

export class FetchTable extends PureComponent {
    static propTypes = {
        route: PropTypes.string.isRequired,
        headersMap: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true
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
  
    fetchData() {
        const { headersMap, route } = this.props;

        let tableData = {
            pagination: {},
            data: []
        };
        FetchService.fetchapi(route,"GET")
        .then(res => {
            if (res.ok)
                return res.json();
            else 
                throw Error(res.status);
        }).then(json => { //data received
                json.forEach(data => {
                    //map data key/values to header columns to perserve display order
                    var obj = {}
                    console.log(data)
                    for (let [key] of Object.entries(headersMap)) {
                        obj[key] = data[key];
                    }
                    if (Object.keys(obj).length > 0)
                        tableData.data.push(obj);
                });
                this.setState({ data: tableData.data, isLoading: false });
            }, ()=> {}).catch(err => {
                throw Error(err);
            });
    }

    renderHeaders() {
        const { headersMap } = this.props;
        return Object.values(headersMap).map((header, index) => {
            return <th key={index}>{header}</th>;
        });
    }

    renderRows() {
        const { data } = this.state;

        return (
            data.map((values, index) => {
                const rawData = Object.values(values);
                return (
                    <tr key={index + "row"}>
                        {rawData.map((value) => {
                            return (<td key={value + "-" + index}>{value}</td>);
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
                <Table hover>
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