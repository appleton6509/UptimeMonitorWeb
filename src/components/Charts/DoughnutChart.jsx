import React, { Component, Fragment } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import LoadingSpinner from '../Design/LoadingSpinner';

export default class DoughnutChart extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        labels: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string.isRequired,
        options: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
        this.chartRef = React.createRef();
      
    }
    componentDidMount() {
        const {labels, title, data} = this.props;
        this.myChart = new Chart(this.chartRef.current, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: title, 
                    data: data,
                    backgroundColor: [
                        'rgba(50, 200, 82, 1)',
                        'rgba(238, 51, 23, 1)'
                    ]
                }]
            }
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data || prevState !== this.state)
            if (this.props.data != null) {
                this.myChart.data.datasets[0].data = this.props.data;
                this.myChart.data.labels = this.props.labels;
                this.myChart.data.label = this.props.title;
                this.myChart.update();
                if (this.state.isLoading == true) this.setState({isLoading: false})
            } 
    }
    render() {
            return (
                <Fragment>
                    { (this.state.isLoading) ? <LoadingSpinner></LoadingSpinner> : ""}
                    <div className={this.state.isLoading ? "hide" : ""}>
                        <canvas ref={this.chartRef} />
                    </div>
                </Fragment>
            );
    }
}