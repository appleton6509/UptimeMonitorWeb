import React, { PureComponent } from 'react';
import { Container, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import LoadingSpinner from '../Design/LoadingSpinner';
import { FetchService } from '../Services/fetchservice';
import '../CSS/GlowingTextStyle.css';
import './LogsFetchTable.css';

/**
 * unqiue number used for keys/id's
 */
let uniqueId = 0;

/**
 * a table component that fetches & renders its own data at timed intervals
 */
export class LogsFetchTable extends PureComponent {
    static propTypes = {
        route: PropTypes.string.isRequired,
        headersMap: PropTypes.object.isRequired,
        hideColumns: PropTypes.object,
        onClick: PropTypes.func,
        interval: PropTypes.number.isRequired
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
        this.fetchTimer = setInterval(() => {
            this.fetchData();
        }, this.props.interval);
        this.fetchData();
    }

    componentWillUnmount() {
        clearInterval(this.fetchTimer);
    }

    componentDidUpdate(prevProps, _prevState) {
        if (prevProps.route !== this.props.route)
            this.fetchData();
    }

    onClick_GetSelected = (event) => {
        const rowData = this.getRowData(event);
        if (this.props.onClick !== undefined)
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
    /**
     * fetches the data from API
     */
    fetchData = async () => {
        const { headersMap, route } = this.props;
        let tableData = {
            pagination: {},
            data: []
        };
        await FetchService.fetchNow(route, "GET")
            .then(json => { //data received
                json.forEach(data => {
                    //  map data key/values to header columns to preserve display order
                    var obj = {}
                    for (let [key] of Object.entries(headersMap)) {
                        obj[key] = data[key];
                    }
                    if (Object.keys(obj).length > 0)
                        tableData.data.push(obj);
                })
            })
            .then(() => this.setState({ data: tableData.data, isLoading: false }))
            .catch(err => {
                console.log(err.code + " - " + err.message);
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
                    className={(Object.keys(headersMap)[index] === hideColumns[Object.keys(headersMap)[index]]) ? "hide " + Object.keys(headersMap)[index] : "" + Object.keys(headersMap)[index]}
                    key={"headers-" + index}>{header}</th>;
            });
    }
    renderCells = (value, index, header) => {
        const { hideColumns } = this.props;
        const id = this.getId();
        switch (header.toLowerCase()) {
            case "latency":
                if (value === 0)
                    return <td headers={header} className={(header === hideColumns[header] ? "hide" : "")}
                        id={id} key={"cell-" + index}>&nbsp;</td>;
                else
                    return <td headers={header} className={(header === hideColumns[header] ? "hide" : "")}
                        id={id} key={"cell-" + index}>{value + " ms"}</td>;
            case "isreachable":
                if (value === true)
                    return <td headers={header} className={(header === hideColumns[header] ? "hide" : "")}
                        id={id} key={"cell-" + index}><div className="on-icon">
                            <i className="fa fa-check-circle" aria-hidden="true"></i></div></td>;
                else
                    return <td headers={header} className={(header === hideColumns[header] ? "hide" : "")}
                        id={id} key={"cell-" + index}><div className="off-icon">
                            <i className="fa fa-times-circle" aria-hidden="true"></i></div></td>;
            default:
                return <td headers={header} className={(header === hideColumns[header] ? "hide" : "")}
                    id={id} key={"cell-" + index}>{value}</td>;
        }
    }
    /**
     * render the row data
     */
    renderRows() {
        const { data } = this.state;
        const { headersMap } = this.props;
        const headersArray = Object.keys(headersMap);
        return (
            data.map((values, index) => {
                const rawData = Object.values(values);
                return (
                    <tr key={index + "row"}
                        onMouseDown={(e) => document.getElementById(e.target.id).style = "cursor:grabbing"}
                        onMouseUp={(e) => document.getElementById(e.target.id).style = "cursor:grab"}
                        style={{ cursor: "grab" }}>
                        {
                            rawData.map((value, index) => {
                                const header = headersArray[index];
                                return (this.renderCells(value, index, header));
                            })
                        }
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
            <Container>
                <Table className="table-small" hover responsive >
                    <thead>
                        <tr>
                            {this.renderHeaders()}
                        </tr>
                    </thead>
                    <tbody onClick={this.onClick_GetSelected}>
                        {this.renderRows()}
                    </tbody>
                </Table>
            </Container>
        );
    }
}
LogsFetchTable.defaultProps = {
    interval: 60000
}