
import { Component } from 'react';
import { API_URI } from '../Settings/API';

export class FetchService extends Component {
    static getHeaders = (token) => {
        return {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        }
    };
    static fetchNow = async(route, method, body = null, token = null) => {
        if (!token)
            throw Error("Missing Token");
        const uri = API_URI + route;
        const headers = this.getHeaders(token);
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

