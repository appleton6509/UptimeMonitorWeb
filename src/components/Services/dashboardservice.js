import {FetchService} from './fetchservice';

export class DashboardService {
    static async getOnlineOffline() {
        return FetchService.fetchNow('Dashboard/ConnectionStatus',"GET",null).catch(err=> {throw Error(err)});
    }
}
