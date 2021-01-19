import {FetchService} from './fetchservice';

export class EndPointService {
    static async getAll() {
        return FetchService.fetchNow('EndPoints',"GET",null)
    }
    static async get(id) {
        return FetchService.fetchNow('EndPoints/'+id,"GET",null)
    }
    static async post(endpoint) {
        return await FetchService.fetchNow('EndPoints',"POST",endpoint);
    }
    static async put(endpoint) {
        return FetchService.fetchNow('EndPoints/'+endpoint.Id,"PUT",endpoint)
    } 
    static async delete(id) {
        return FetchService.fetchNow('EndPoints/'+id,"DELETE",null)
    } 
    static async getOnlineOffline() {
        return FetchService.fetchNow('EndPoints/ConnectionStatus',"GET",null)
    }
    static async getLatencyByTime(query) {
        return FetchService.fetchNow(query,"GET",null)
    }
}
