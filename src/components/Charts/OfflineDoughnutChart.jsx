import React, { Component } from 'react';
import { DashboardService } from '../Services/dashboardservice';
import DoughnutChart from "./DoughnutChart";

export default class OfflineDoughnutChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            labels: ['Offline'],
            title: 'Devices Offline',
            backgroundColor: 'rgba(238, 51, 23, 1)'
        }
    }
    async componentDidMount() {
        await this.fetchOfflineData();
    }

    fetchOfflineData = async () => {
        let on = 0;
        let off = 0;
        return await DashboardService.getOnlineOffline()
            .then(data => {
                data.forEach(element => {
                    // eslint-disable-next-line no-unused-vars
                    const [ip, timedate, reachable] = Object.entries(element);
                    reachable[1] ? on++ : off++;
                });
            })
            .then(() => {
                this.setState({ data: [off] })})
            .catch(err => {
                    console.log(err);
            });
    }
    render() {
        const {data,title,labels, backgroundColor} = this.state
        return(<DoughnutChart data={data} title={title} labels={labels} backgroundColor={backgroundColor}/>);
    }
}