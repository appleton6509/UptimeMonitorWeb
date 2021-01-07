import React, { Fragment, PureComponent } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';

export default class DropDownFilter extends PureComponent {
    static propTypes = {
            header: PropTypes.string.isRequired,
            values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string,PropTypes.number])).isRequired,
            selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            onClick: PropTypes.func.isRequired
    }
    
    render() {
        const { header, values, selectedValue } = this.props;
        return (
            <UncontrolledDropdown className="float-left m-1">
                <DropdownToggle style={{backgroundColor: 'transparent', color: 'black', border: 'none'}} caret>
                    {selectedValue ? "" : header} {selectedValue}
                </DropdownToggle>
                <DropdownMenu >
                    {values.map((value) => {
                        return (
                            <DropdownItem key={value}>
                                <div onClick={(e) => {
                                    this.props.onClick(value);
                                }}>
                                    {value}
                                </div>
                            </DropdownItem>);
                    })}
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}
