
import React, { Component } from 'react';
import { API_URI } from '../Settings/API';

export class FetchService extends Component {
    static getToken = () => {
        return localStorage.getItem("x-auth-token");
    };

    static getHeaders = (token) => {
        return {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        }
    };
    static fetchNow = async(route, method, body = null) => {
        const token = this.getToken();
        if (!token)
            console.log("Token missing");
        const uri = API_URI + route;
        const headers = this.getHeaders(token);
        let data = await fetch(uri, {
            method: method,
            headers: headers,
            body: (body != null ? JSON.stringify(body) : null)})
            .then(this.handleErrors)
            .then(res=> {return res})
            .catch((err) => {throw {code: 0, message: err};})
        return data;
    }
    static handleErrors = (res) => {
       if (res.status === 401) {
        window.location.replace("/deauthorize");
       }

       if (!res.ok)
            throw {code: res.status, message: res.statusText};
        return res;
    }
}

