import React, { Component } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import LoadingSpinner from '../Design/LoadingSpinner';

export default class CustomChart extends React.Component {
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
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
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
        return (<canvas ref={this.chartRef}/>);
    }
}