import React, { Component } from 'react';
import { DataToCellConverter } from './DataToCellConverter';
import PropTypes from 'prop-types';

/**
 * unqiue number used for keys/id's
 */
let uniqueId = 0;

export class DataToRowConverter extends Component {
    static propTypes = {
        headersMap: PropTypes.object,
        hideColumns: PropTypes.object,
        data: PropTypes.object
    }
     /**
     * gets a unique id for keys
     */
    getId() {
        uniqueId++
        return uniqueId;
    }

    renderRows() {
        const { hideColumns,headersMap, data } = this.props;
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
                            rawData.map((value, ind) => {
                                const header = headersArray[ind];
                                return <DataToCellConverter key={"cell" + this.getId()} header={header} 
                                hideColumns={hideColumns} value={value} index={ind}/>;
                            })
                        }
                    </tr>
                );
            })
        );
    }

    render() {
        return this.renderRows();
    }
}