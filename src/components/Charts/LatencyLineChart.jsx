import { EndPointService } from 'components/Services/endpointservice';
import React, { Fragment, PureComponent } from 'react';
import { Row, Col, Container } from 'reactstrap';
import LineChart from "./LineChart";
import "./LineChart.css";
import PropTypes from "prop-types";
import uribuilder from "../Utilities/uribuilder";
import moment from "moment";
export default class LatencyLineChart extends PureComponent {
    static propTypes = {
        endpointId: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: 'true',
            labels: ["12pm", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm",
                "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"]
        }
    }
    async componentDidMount() {
        // await this.fetchData();
        this.generateTestData();
    }
    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps !== this.props)
            this.generateTestData();
            // await this.fetchData();
    }

    buildQuery = () => {
        const { endpointId, startDate, endDate } = this.props;
        var uri = new uribuilder("Result/LogsByTime/" + endpointId);
        uri.addQuery({ start: startDate, end: endDate })
        return uri.build();
    }

    generateTestData = () => {
        var data = []
         var hours = 0;
         var minutes = 0;
         var latency = 10;
        while( hours < 24) {
            while (minutes < 60)
            {
                var date = moment().startOf('day');
                date.hour(hours)
                date.minute(minutes)
                data.push({x: date.toDate(), y:latency});
                minutes++;
                latency++;
                latency++;
                if (latency >70)
                    latency = 5;
            }
            hours++;
            minutes = 0;
        } 
        this.setState({ isLoading: false, data: data })
    }
    fetchData = async () => {
        const { endpointId, startDate, endDate } = this.props;
        if (!endpointId || !startDate || !endDate) return;

        let timedata = []
       
        return await EndPointService.getLatencyByTime(this.buildQuery())
            .then(res => { return res.json() })
            .then(data => {
                data.forEach(element => {
                    // eslint-disable-next-line no-unused-vars
                    const [timestamp, isReachable, latency, endpointid] = Object.entries(element)
                        const min = moment.utc(timestamp[1]).minute();
                        const time = moment.utc(timestamp[1]).toDate();
                        timedata.push({x: time, y: latency[1]});
                });
            })
            .then(() => {
                this.setState({ isLoading: false, data: timedata })
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        const { data, labels } = this.state
        return (

                        <LineChart data={data} />   

        );
    }
}