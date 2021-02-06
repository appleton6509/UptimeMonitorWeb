import React, { Component } from 'react';
import { DataToCellConverter } from './DataToCellConverter';
import PropTypes from 'prop-types';
import './DataToRowConverter.css';

/**
 * unqiue number used for keys/id's
 */
let uniqueId = 0;

export class DataToRowConverter extends Component {
    static propTypes = {
        headersMap: PropTypes.object,
        hideColumns: PropTypes.object,
        onClickGetRow: PropTypes.func,
        showDeleteIcon: PropTypes.bool,
        onDeleteClick: PropTypes.func,
        data: PropTypes.array,
        dateColumns: PropTypes.array,
    }
    onClick_DeleteIcon = (e) => {
        this.getSelectedRow(e).then((data) => {
            this.props.onDeleteClick(data);
        })
    }

    onClick_Row = (e) => {
        if (e.target.localName === "i")
            return;
        this.getSelectedRow(e).then((data) => {
            if (data && Object.values(data).length > 0)
                this.props.onClickGetRow(data);
        })
    }
    /**
    * gets a unique id for keys
    */
    getId() {
        uniqueId++
        return uniqueId;
    }
    getSelectedRow = async (e) => {
        let x;
        try {
            x = e.target.closest('td');
        } catch {/** may be null if certain cells clicked. */}

        if (!x)
        return;

        let rowData = {}
        let fetchdata;
        while (x != null) {
            if (x.headers !== '') {
                fetchdata = x.getAttribute('data-fetch');
                rowData[x.headers] = x.outerText !== "" ? x.outerText : fetchdata;
            }
            try {
                x = x.nextSibling
            } catch {
                x = null
            }
        }
        x = e.target.closest('td');
        while (x != null) {
            if (x.headers !== '') {
                fetchdata = x.getAttribute('data-fetch');
                rowData[x.headers] = x.outerText !== "" ? x.outerText : fetchdata;
            }
            try {
                x = x.previousSibling
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
                            <td id={"trashcancell-" + generatedId}>
                                <i onClick={this.onClick_DeleteIcon} id={"trashicon-" + generatedId} className="p-1 fa fa-trash-o trashcan text-danger"></i>
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