import {Component,  React}  from 'react';
import PropTypes from 'prop-types';
export class ShadowBox extends Component {
    static propTypes = {
        isChart: PropTypes.bool,
        style: PropTypes.any,
        className: PropTypes.string
    }
    constructor(props) {
        super(props);
    }
    render() {
        const {isChart, style, className} = this.props;
        let classes =  "mt-3 shadow theme1-bg theme1-border";
        isChart ? classes += " chart" : "";
        className ? classes += " " + className : "";
     return(
        <div className={classes} style={style}>
        {this.props.children}
        </div>

     );
    }
}