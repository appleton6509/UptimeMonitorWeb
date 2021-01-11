import {FetchService} from './fetchservice';

export class PerformanceService {
    static async getStatistics(endpointid) {
        return FetchService.fetchNow('EndPoint/Statistics/'+endpointid,"GET",null).catch(err=> {throw Error(err)});
    }
}
