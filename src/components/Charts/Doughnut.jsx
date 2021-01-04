import {PureComponent, React} from 'react';
import {Chart} from 'chart.js';

export default class Doughnut extends PureComponent {
    constructor(props) {
        super(props);
    
        this.chartRef = React.createRef();
    }
    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: 'doughnut',
            data: this.props.data,
            options: this.props.options
        })
    }
    handleData = (data) => {

    }
    render() {
        return(
            <canvas ref={this.chartRef} />
        );

    }
}