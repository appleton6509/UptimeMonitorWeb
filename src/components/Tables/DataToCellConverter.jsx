import React, { Component } from 'react'; 
import PropTypes from 'prop-types';

/**
 * unqiue number used for keys/id's
 */
let uniqueId = 0;

export class DataToCellConverter extends Component {
    static propTypes = {
        hideColumns: PropTypes.objectOf(PropTypes.string),
        header: PropTypes.string,
        index: PropTypes.any,
        value: PropTypes.any
    }
    constructor(props){
        super(props);
    }
     /**
     * gets a unique id for keys
     */
    getId() {
        uniqueId++
        return uniqueId;
    }

    render() {
        const { hideColumns,header,index,value } = this.props;
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
}

