import {FetchService} from './fetchservice';

export class DashboardService {
    static async getOnlineOffline(token) {
        return FetchService.fetchNow('Dashboard/ConnectionStatus',"GET",null,token).catch(err=> {throw Error(err)});
    }
}
