import React, { Component } from 'react';
import { DashboardService } from '../Services/dashboardservice';
import DoughnutChart from "./DoughnutChart";
export default class OnOffDoughnutChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            labels: ['Online', 'Offline'],
            title: 'Connected Devices'
        }
    }
    async componentDidMount() {
        await this.fetchOnlineOfflineData();
    }

    fetchOnlineOfflineData = async () => {
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
                this.setState({ data: [on, off] })})
            .catch(err => {
                    console.log(err);
            });
    }
    render() {
        const {data,title,labels} = this.state
        return(<DoughnutChart data={data} title={title} labels={labels}/>);
    }
}