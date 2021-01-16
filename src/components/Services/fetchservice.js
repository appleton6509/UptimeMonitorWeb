
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
            'Authorization': 'Bearer ' + token
        }
    };
    static fetchNow = async (route, method, body = null) => {
        const token = this.getToken();
        if (!token)
            console.log("Token missing");
        const uri = API_URI + route;
        const headers = this.getHeaders(token);
        return await fetch(uri, {
            method: method,
            headers: headers,
            body: (body != null ? JSON.stringify(body) : null)
        })
            .then(res => {
                if (res.status === 401)
                    window.location.replace("/deauthorize")
                if (res.ok) 
                    return res;                
                else {
                    res.text().then(text => {
                        let error = text
                        try {
                            let json = JSON.parse(text);
                            if (json["errors"]) {
                                for (let value of Object.values(json["errors"]))
                                    error = value.pop();
                            }
                        } catch { console.log(""); }
                        throw error
                    })
                }
            })
            .catch(err => {
                throw err
            })
    }

}

