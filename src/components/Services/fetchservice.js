import {API_URI} from '../Settings/API'
import {UserContext} from '../Context/UserContext';

export class FetchService {
    static contextType = UserContext;
    static getHeaders() {
        let context = this.context;
        const token =  context.user.token;
        return {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        }
    };
    static async fetchNow(route, method, body = null) {
        const uri = API_URI + route;
        const headers = this.getHeaders();
         return await fetch(uri, {
            method: method,
            headers: headers,
            body: (body != null ? JSON.stringify(body) : null)})
            .then(res => {
                if (!res.ok)
                    throw Error(res.statusText);
                return res.json();
            })
            .catch(console.log);
            
 
    }
}



