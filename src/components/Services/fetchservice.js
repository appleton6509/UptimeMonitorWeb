
import React, { Component } from 'react';
import { API_URI } from '../Settings/API';

export class FetchService extends Component {
    static getToken = () => {
        return localStorage.getItem("x-auth-token");
    };

    static getHeaders = (token) => {
        let header;
        if (token)
            header = {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        else
            header = {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        return header
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
                if (res.status === 401) {
                    console.log("Error 401: user not authorized");
                    window.location.replace("/deauthorize")
                }
                if (res.ok)
                    return res;
                else {
                    console.log("Error Status Code: " + res.status);
                    let error = "Something went wrong. Try Again?";
                    return res.text().then(text => {
                        if (text.length > 0) {
                            error = text;
                            try {
                                let json = JSON.parse(text);
                                if (json["errors"]) {
                                    for (let value of Object.values(json["errors"]))
                                        error = value.pop();
                                }
                            } catch { throw error }
                        }
                        throw error
                    }).catch(err => { throw err })
                }
            })
            .catch(err => {
                throw err
            })
    }

}

