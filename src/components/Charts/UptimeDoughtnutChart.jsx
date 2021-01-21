import { EndPointService } from 'components/Services/endpointservice';
import React, { PureComponent } from 'react';
import DoughnutChart from "./DoughnutChart";
import PropTypes from 'prop-types'
import uribuilder from '../Utilities/uribuilder';
import moment from 'moment';
export default class UptimeDoughtnutChart extends PureComponent {
    static propTypes = {
        endpointId: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            centerData: "",
            centerLabel: "Uptime",
            labels: ['Online', 'Offline'],
            isLoading: 'true'
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

        let online = []
        let offline = []
        return await EndPointService.getLatencyByTime(this.buildQuery())
            .then(res => { return res.json() })
            .then(data => {
                data.forEach(element => {
                    const [timestamp, isReachable, latency, endpointid] = Object.entries(element)
                    const time = moment.utc(timestamp[1]).toDate();

                   (!isReachable[1]) ? 
                        offline.push({time: time, isReachable: isReachable}) :
                        online.push({x: time, y: latency[1]});
                });

            })
            .then(() => {

                const total = offline.length + online.length;
                let offlinePercent = 0;
                let onlinePercent = 0;
                if (online.length === 0)
                    offlinePercent = 100;
                else if (offline.length === 0)
                    onlinePercent = 100;
                else {
                    onlinePercent = Math.round((online.length / total) * 100);
                    offlinePercent = (100 - onlinePercent);
                }
                this.setState({ isLoading: false, data: [onlinePercent, offlinePercent], 
                    centerData: onlinePercent + "%" })
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (<DoughnutChart {...this.state}/>);
    }
}