import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import "./DataToCellConverter.css";
/**
 * unqiue number used for keys/id's
 */
let uniqueId = 0;

export class DataToCellConverter extends Component {
    static propTypes = {
        hideColumns: PropTypes.objectOf(PropTypes.string),
        header: PropTypes.string,
        index: PropTypes.any,
        value: PropTypes.any,
        dateColumns: PropTypes.array,
    }
    constructor(props) {
        super(props);
    }
    /**
    * gets a unique id for keys
    */
    getId() {
        uniqueId++
        return uniqueId;
    }

    formatDate = () => {
        const { hideColumns, header, index, value } = this.props;
        const id = this.getId();
        let newValue;
        if (!value) newValue = " "
        else {
            var date = moment.utc(value).toDate()
            newValue = moment(date).format("LLL")
        }
        return <td headers={header} className={(header === hideColumns[header] ? "hide " : "cell")}
            id={id} key={"cell-" + index}>{newValue}</td>;
    }
    formatLatency() {
        const { hideColumns, header, index, value } = this.props;
        const id = this.getId();
        return <td headers={header} className={(header === hideColumns[header] ? "hide" : "")}
            id={id} key={"cell-" + index}>{value > 0 ? value + " ms" : " "}</td>;
    }
    formatProtocol() {
        const { hideColumns, header, index, value } = this.props;
        const id = this.getId();
        return <td headers={header} className={(header === hideColumns[header] ? "hide" : "cell")}
            id={id} key={"cell-" + index}><div style={{fontSize: "0.8rem", fontWeight: "lighter", fontFamily: ""}}><div className="p-2 badge badge-primary">{value}</div></div></td>;
    }
    formatNotify() {
        const { hideColumns, header, index, value } = this.props;
        const id = this.getId();
        return <td headers={header} data-fetch={value} className={(header === hideColumns[header] ? "hide" : "cell")}
            id={id} key={"cell-" + index}>
            {value ? <a className="fa fa-check mt-auto mb-auto"></a> : ""}
            </td>;
    }
    formatDefault() {
        const { hideColumns, header, index, value } = this.props;
        const id = this.getId();
        let newValue;
        if (value === true) 
            newValue = "true";
        else if (value === false)
            newValue = "false";
        else newValue = value;
        return <td headers={header} className={(header === hideColumns[header] ? "hide" : "")}          
            id={id} key={"cell-" + index}>{newValue}</td>;
    }
    formatIsReachable() {
        const { hideColumns, header, index, value } = this.props;
        const id = this.getId();
        if (value === true)
            return <td headers={header} data-fetch={true} className={(header === hideColumns[header] ? "hide" : "")}
                id={id} key={"cell-" + index}><i className="fa fa-desktop fa-2x text-success" aria-hidden="true"></i></td>;
        else
            return <td headers={header} data-fetch={false} className={(header === hideColumns[header] ? "hide" : "")}
                id={id} key={"cell-" + index}><i className="fa fa-desktop fa-2x text-danger" aria-hidden="true"></i></td>;
    }
    getHeaderType() {
        const { header, dateColumns } = this.props;
        if (!header)
            return "NoHeaderFound";
        const dateCheck = dateColumns ? dateColumns.includes(header) : false;
        const head = header.toLowerCase();
        let returnValue;
        if (dateCheck)
            returnValue = "date";
        else if (head === "latency" || head === "averagelatency")
            returnValue = "latency";
            else if (head === "isreachable")
            returnValue = "isreachable"
            else if (head === "protocol")
            returnValue = "protocol"
            else if (head === "notifyonfailure")
            returnValue = "notifyonfailure"
        else returnValue = head;
        return returnValue;
    }
    render() {
        let htmlData;
        const headertype = this.getHeaderType();
        switch (headertype) {
            case "latency":
                htmlData = this.formatLatency();
                break;
            case "isreachable":
                htmlData = this.formatIsReachable();
                break;
            case "date":
                htmlData = this.formatDate();
                break;
                case "protocol":
                    htmlData = this.formatProtocol();
                    break;
                    case "notifyonfailure":
                        htmlData = this.formatNotify();
                        break;
            default:
                htmlData = this.formatDefault();
        }
        return htmlData;

    }
}

