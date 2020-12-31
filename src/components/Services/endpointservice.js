import {FetchService} from './fetchservice';

export class EndPointService {
    static async getAllEndPoints() {
        return FetchService.fetchNow('EndPoints',"GET").catch(err=> {throw Error(err)});
    }
    static async getEndPoint(id) {
        return FetchService.fetchNow('EndPoints/'+id,"GET").catch(err=> {throw Error(err)});
    }
    static async postEndPoint(endpoint) {
        return FetchService.fetchNow('EndPoints',"POST",endpoint).catch(err=> {throw Error(err)});
    }
    static async putEndPoint(endpoint) {
        return await FetchService.fetchNow('EndPoints/'+endpoint.id,"PUT",endpoint).catch(err=> {throw Error(err)});
    } 
}
