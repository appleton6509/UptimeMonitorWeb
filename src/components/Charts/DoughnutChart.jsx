import React, { Component, Fragment } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import LoadingSpinner from '../Design/LoadingSpinner';
import "./DoughnutChart.css";

export default class DoughnutChart extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        centerData: PropTypes.string,
        centerLabel: PropTypes.string,
        labels: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            centerText: ''
        }
        this.chartRef = React.createRef();

    }
    componentWillUnmount() {

    }
    chartOptions = () => {
        const { title } = this.props;
        let titleExists = title ? true : false;
        return {
            responsive: true,
            legend: {
                position: "bottom",
                display: false
            },
            title: {
                position: "top",
                display: titleExists,
                text: title,
            },
            aspectRatio: 1,
            cutoutPercentage: 75
            
        }
    }
 
    componentDidMount() {
        const { labels, title, data, backgroundColor } = this.props;
        let titleExists = title ? true : false;
        this.myChart = new Chart(this.chartRef.current, {
            type: 'doughnut',
            options: this.chartOptions(this.props.centerData),        
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColor ? backgroundColor :
                        [
                            'rgba(50, 200, 82, 1)',
                            'rgba(238, 51, 23, 1)'
                        ]
                }]
            }
        });
        // const test = document.getElementById("canvas");
        // const ctx = test.getContext("2d");
        // ctx.font = "20px Georgia";
        // ctx.fillText("test",100,100);
        this.myChart.canvas.getContext("2d").restore();
        this.myChart.canvas.getContext("2d").fillText("test",100,10)
        this.myChart.canvas.getContext("2d").save();
        this.myChart.update();

    }
    componentDidUpdate(prevProps, prevState) {
        const { data, labels, title, backgroundColor } = this.props;
        if (prevProps.data !== data || prevState !== this.state)
            if (data !== null && data !== undefined) {
                this.myChart.data.datasets[0].data = data;
                this.myChart.data.labels = labels;
                this.myChart.data.label = title
                this.myChart.data.datasets[0].backgroundColor = backgroundColor ?
                    backgroundColor : this.myChart.data.datasets[0].backgroundColor
                this.myChart.update();
                if (this.state.isLoading == true) this.setState({ isLoading: false })
            }
    }
    render() {
        const {centerData, centerLabel} = this.props;
        return (
            <Fragment>
                {(this.state.isLoading) ? <LoadingSpinner></LoadingSpinner> : ""}
                <div className={this.state.isLoading ? "hide" : ""}>
                     <canvas id="canvas" ref={this.chartRef}/>
                     <div className="absolute-center text-center"><p>{centerData}<br/>{centerLabel}</p></div>
                </div>
            </Fragment>
        );
    }
}