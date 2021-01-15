import React, { Component } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

export default class LineChart extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        data2: PropTypes.object,
        data1Label: PropTypes.string,
        data2Label: PropTypes.string,
        labels: PropTypes.arrayOf(PropTypes.string),
        title: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            labels: {},
            data: {x:"", y:""},
            data2: {x:"", y:""},
        }
        this.chartRef = React.createRef();

    }
    componentDidMount() {
        const { labels, title, data, data2,data1Label,data2Label, backgroundColor } = this.props;
        let titleExists = title ? true : false;
        var option = {
            responsive: true,
            maintainAspectRatio: false,
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
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 8
                    }
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
                        backgroundColor: function(context) {
                            var index = context.datasetIndex;
                            var value = context.dataset.data[index];
                            if (!value)
                                return;
                            return value.y <= 0 ? 'red' : 'rgb(54, 162, 235)';
                        },
                        borderColor: function(context) {
                            var index = context.datasetIndex;
                            var value = context.dataset.data[index];
                            if (!value)
                                return;
                            return value.y <= 0 ? 'red' : 'rgb(54, 162, 235)';
                        },
                        // backgroundColor: ,
                        time: {
                            unit: 'hours'
                        },
                        order: 1,
                        label: data1Label,
                        pointRadius: 0,
                        hitRadius: 10,
                        spanGaps: false,
                        pointStyle:'circle'
                    } 
                    // {
                    //     data: data2,
                    //     borderColor: 'red',
                    //     backgroundColor: 'red',
                    //     label: data2Label,
                    //     borderWidth: 2,
                    //     type: 'line',
                    //     order: 2,
                    //     hitRadius: 2,
                    //     spanGaps: false,
                    //     pointStyle:'line',
                    //     pointRadius: 0
                    // }
                ]
            }
        });

    }
    componentDidUpdate(prevProps, prevState) {
        const { data, data2, labels, title, backgroundColor } = this.props;
        if (prevProps.data !== data || prevState !== this.state)
            if (data !== null && data !== undefined) {
                this.myChart.data.datasets[0].data = data;
                // this.myChart.data.datasets[1].data = data2;
                //  this.myChart.data.labels = labels;
                // this.myChart.data.label = title
                // this.myChart.data.datasets[0].backgroundColor = backgroundColor ?
                //     backgroundColor : this.myChart.data.datasets[0].backgroundColor
                this.myChart.update();
                if (this.state.isLoading == true) this.setState({ isLoading: false })
            }
    }
    render() {
        return (<canvas ref={this.chartRef} />);
    }
}