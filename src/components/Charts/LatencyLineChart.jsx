import { EndPointService } from 'components/Services/endpointservice';
import React, {  PureComponent } from 'react';
import LineChart from "./LineChart";
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
            offlinedata: [],
            isLoading: 'true',
            dataLabel: 'Latency',
            offlineDataLabel: 'Offline'
            }
    }
    async componentDidMount() {
        await this.fetchData();
    }
    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps !== this.props)
            await this.fetchData();
    }

    buildQuery = () => {
        const { endpointId, startDate, endDate } = this.props;
        var uri = new uribuilder("Result/LogsByTime/" + endpointId);
        uri.addQuery({ start: startDate, end: endDate })
        return uri.build();
    }
    isEmpty = (value) => {
        if (!value || value === "" || value.length === 0)
            return true;
        return false;
    }
    fetchData = async () => {
        const { endpointId, startDate, endDate } = this.props;
        if (this.isEmpty(endpointId) || this.isEmpty(startDate) || this.isEmpty(endDate)) 
            return;

        let timedata = []
        let offlinedata = []
        return await EndPointService.getLatencyByTime(this.buildQuery())
            .then(res => { return res.json() })
            .then(data => {
                data.forEach(element => {
                    const [timestamp, isReachable, latency, endpointid] = Object.entries(element)
                    const min = moment.utc(timestamp[1]).minute();
                    const time = moment.utc(timestamp[1]).toDate();
                    if (!isReachable[1]) { //is offline
                        offlinedata.push({x: time, y: 0});
                        timedata.push({x: time, y: 0});
                    }
                     else 
                     {
                        if(isReachable && latency[1] < 1) //is online
                            timedata.push({x: time, y: 1});
                        timedata.push({x: time, y: latency[1]});
                     }
                });

            })
            .then(() => {
                this.setState({ isLoading: false, data: timedata, offlinedata: offlinedata })
            })
            .catch(err => {
                console.log(err);
            });
    } 
    render() {
        const { data, offlinedata,dataLabel,offlineDataLabel, labels } = this.state
        return (<LineChart data={data} data2={offlinedata} data1Label={dataLabel} data2Label={offlineDataLabel}/>   
        );
    }
}