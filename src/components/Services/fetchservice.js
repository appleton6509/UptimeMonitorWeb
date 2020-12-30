import {AuthService} from '../Services/authservice'
import {API_URI} from '../Settings/API'

export class FetchService {
    static getHeaders() {
        const token = AuthService.getToken();
        return {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        }
    };

    static async fetchapi(route, method, body = null) {
        const uri = API_URI + route;
        const headers = this.getHeaders();
        return await fetch(uri, {
            method: method,
            headers: headers,
            body: (body != null ? JSON.stringify(body) : null) 
        });
    }
}



