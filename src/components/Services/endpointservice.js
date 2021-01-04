import {FetchService} from './fetchservice';

export class EndPointService {
    static async getAll(token) {
        return FetchService.fetchNow('EndPoints',"GET",null,token).catch(err=> {throw Error(err)});
    }
    static async get(id,token) {
        return FetchService.fetchNow('EndPoints/'+id,"GET",null,token).catch(err=> {throw Error(err)});
    }
    static async post(endpoint,token) {
        return FetchService.fetchNow('EndPoints',"POST",endpoint,token).catch(err=> {throw Error(err)});
    }
    static async put(endpoint,token) {
        return await FetchService.fetchNow('EndPoints/'+endpoint.id,"PUT",endpoint,token).catch(err=> {throw Error(err)});
    } 
    static async delete(id,token) {
        return await FetchService.fetchNow('EndPoints/'+id,"DELETE",null,token).catch(err=> {throw Error(err)});
    } 
}
