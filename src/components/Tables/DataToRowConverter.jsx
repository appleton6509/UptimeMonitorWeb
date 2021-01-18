import React, { Component } from 'react';
import { DataToCellConverter } from './DataToCellConverter';
import PropTypes from 'prop-types';
import './DataToRowConverter.css';

/**
 * unqiue number used for keys/id's
 */
let uniqueId = 0;
let inCell = null;
export class DataToRowConverter extends Component {
    static propTypes = {
        headersMap: PropTypes.object,
        hideColumns: PropTypes.object,
        onClickGetRow: PropTypes.func,
        showDeleteIcon: PropTypes.bool,
        onDeleteRow: PropTypes.func,
        data: PropTypes.array,
        dateColumns: PropTypes.array,
    }
    onClick_DeleteIcon= (e) => {
        const row = this.getSelectedRow(e);
        this.props.onDeleteRow(row);
    }

    onClick_Row = (e) => {
        let rowData = this.getSelectedRow(e);
        this.props.onClickGetRow(rowData);
    }
    /**
    * gets a unique id for keys
    */
   getId() {
    uniqueId++
    return uniqueId;
}
    getSelectedRow = (e) => {
        let x = document.getElementById(e.target.id).closest('td');
        let rowData = {}
        while (x != null) {
            if (x.headers !== '')
                rowData[x.headers] = x.outerText;
            try {
                x = document.getElementById(x.id).nextSibling
            } catch {
                x = null
            }
        }
        x = document.getElementById(e.target.id).closest('td');
        while (x != null) {
            if (x.headers !== '')
                rowData[x.headers] = x.outerText;
            try {
                x = document.getElementById(x.id).previousSibling
            } catch {
                x = null
            }
        }
        return rowData;
    }

    renderRows() {
        const { hideColumns, headersMap, data, dateColumns, showDeleteIcon } = this.props;
        const headersArray = Object.keys(headersMap);
        return (
            data.map((values, index) => {
                const rawData = Object.values(values);
                const generatedId = this.getId();
                const rowId = "row" + "-" + generatedId + "-" + index;
                return (
                    <tr key={rowId}
                        id={rowId}
                        onClick={this.onClick_Row}>
                        {rawData.map((value, ind) => {
                                const header = headersArray[ind];
                                const id = "cell-" + this.getId()
                                return (
                                        <DataToCellConverter
                                            key={id} id={id} header={header}
                                            hideColumns={hideColumns} value={value}
                                            dateColumns={dateColumns} index={ind} />
                                );
                            })} 
                            {showDeleteIcon ? 
                            <td id={"trashcancell-"+ generatedId}>
                            <i onClick={this.onClick_DeleteIcon} id={"trashicon-"+generatedId} className="fa text-danger fa-trash-o trashcan"></i>
                            </td> : null}
                    </tr>
                );
            })
        );
    }

    render() {
        return this.renderRows();
    }
}
DataToRowConverter.defaultProps = {
    showDeleteIcon: false
}