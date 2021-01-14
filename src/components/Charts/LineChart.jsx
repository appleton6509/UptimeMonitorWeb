import React, { Component, Fragment } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import LoadingSpinner from '../Design/LoadingSpinner';
import "./LineChart.css";

export default class LineChart extends Component {
    static propTypes = {
        data: PropTypes.any.isRequired,
        data2: PropTypes.any,
        // labels: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            labels: {}
        }
        this.chartRef = React.createRef();

    }
    componentDidMount() {
        const { labels, title, data, data2,data1Label,data2Label, backgroundColor } = this.props;
        let titleExists = title ? true : false;
        var option = {
            responsive: true,
            aspectRatio: 5,
            legend: {
                position: "bottom",
                display: true
            },
            title: {
                position: "top",
                display: titleExists,
                text: title,
            },
            scales: {
                xAxes: [{
                    type: "time",
                    distribution: "series",
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
        }
        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
            options: option,
            data: {
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: 'rgb(54, 162, 235)',
                        time: {
                            unit: 'hours'
                        },
                        order: 1,
                        label: data1Label,
                        pointRadius: 0
                    }, 
                    {
                        data: data2,
                        borderColor: 'red',
                        label: data2Label,
                        borderWidth: 2,
                        type: 'line',
                        order: 2,
                        pointRadius: 1
                    }
                ]
            }
        });

    }
    componentDidUpdate(prevProps, prevState) {
        const { data, data2, labels, title, backgroundColor } = this.props;
        if (prevProps.data !== data || prevState !== this.state)
            if (data !== null && data !== undefined) {
                this.myChart.data.datasets[0].data = data;
                this.myChart.data.datasets[1].data = data2;
                //  this.myChart.data.labels = labels;
                // this.myChart.data.label = title
                // this.myChart.data.datasets[0].backgroundColor = backgroundColor ?
                //     backgroundColor : this.myChart.data.datasets[0].backgroundColor
                this.myChart.update();
                if (this.state.isLoading == true) this.setState({ isLoading: false })
            }
    }
    render() {
        return (
            <Fragment>
                    <canvas ref={this.chartRef} />
            </Fragment>
        );
    }
}