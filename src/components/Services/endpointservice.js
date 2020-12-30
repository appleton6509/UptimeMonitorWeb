import {FetchService} from './fetchservice';

export class EndPointService {
    static async getAllEndPoints() {
        let errorCode;
        const data = await FetchService.fetchapi('EndPoints',"GET").then(res => {
            if (res.ok)
                return res.json();
            else 
                errorCode = res.status
        }).then(data => {
            return data;
        }).catch(err => {
            errorCode = err;
        });
        return new Promise((resolve,reject) => {
            if (errorCode)
                reject(Error(errorCode));
            resolve(data);
        });
    }
    static async getEndPoint(id) {
        let errorCode;
        const data = await FetchService.fetchapi('EndPoints/'+ id,"GET").then(res => {
            if (res.ok)
                return res.json();
            else 
                errorCode = res.status
        }).then(data => {
            return data;
        }).catch(err => {
            errorCode = err;
        });
        return new Promise((resolve,reject) => {
            if (errorCode)
                reject(Error(errorCode));
            resolve(data);
        });
    }
    static async postEndPoint(endpoint) {
        let errorCode;
        const data = await FetchService.fetchapi('EndPoints',"POST",endpoint)
        .then(res => {
            if (res.ok)
                return res.json();
            else 
                errorCode = res.status
        }).then(data => {
            return data;
        }).catch(err => {
            errorCode = err;
        });
        return new Promise((resolve,reject) => {
            if (errorCode)
                reject(Error(errorCode));
            resolve(data);
        });
    }
}
