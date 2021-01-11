import {FetchService} from './fetchservice';

export class EndPointService {
    static async getAll() {
        return FetchService.fetchNow('EndPoints',"GET",null).catch(err=> {throw Error(err)});
    }
    static async get(id) {
        return FetchService.fetchNow('EndPoints/'+id,"GET",null).catch(err=> {throw Error(err)});
    }
    static async post(endpoint) {
        return FetchService.fetchNow('EndPoints',"POST",endpoint).catch(err=> {throw Error(err)});
    }
    static async put(endpoint) {
        return await FetchService.fetchNow('EndPoints/'+endpoint.id,"PUT",endpoint).catch(err=> {throw Error(err)});
    } 
    static async delete(id) {
        return await FetchService.fetchNow('EndPoints/'+id,"DELETE",null).catch(err=> {throw Error(err)});
    } 
    static async getOnlineOffline() {
        return FetchService.fetchNow('EndPoints/ConnectionStatus',"GET",null).catch(err=> {throw Error(err)});
    }
}
