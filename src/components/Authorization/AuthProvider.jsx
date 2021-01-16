import React, { Component } from 'react';
import { API_URI } from "../Settings/API.js";
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';
import PropTypes from 'prop-types';

const { Provider, Consumer } = AuthContext;

class AuthProvider extends Component {
    static propTypes = {
        isLoaded: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: "",
                token: "",
                id: "",
                isAuthenticated: ""
            },
            login: async (username, password) => { },
            createLogin: async (username, password) => { },
            logout: () => { },
            unauthorized: () => { },
            checkauthorization: () => { }
        }
    }
    componentDidMount = () => {
        this.createState();
        this.props.isLoaded(true);
    }
    createState = () => {
        const user = this.getUserAuthentication();
        const logout = this.logout;
        const createLogin = this.createLogin;
        const login = this.login;
        const unauthorized = this.unauthorized;
        const checkauthorization = this.checkauthorization;
        this.setState({ user, login, createLogin, logout, unauthorized, checkauthorization });
    }
    checkauthorization = () => {
        if (!this.state.user.isAuthenticated)
            window.location.replace("/deauthorize");
    }

    logout = () => {
        toast.info("Logging out.");
        this.setToken("");
        this.setState({ user: { name: "", token: "", id: "", isAuthenticated: false } });
        this.navigateHome();
    }
    /**
    * @returns {Object} a object containing "error" message and boolean "success"
    * @param {string} username 
    * @param {string} password 
    */
    createLogin = async (username, password) => {
        const uri = API_URI + 'Auth/SignUp';
        const jsonbody = JSON.stringify({ Username: username, Password: password });
        const toastid = toast.info("Creating Account...");
        let status = {
            error: "",
            success: false
        }
        return await fetch(uri, {
            method: 'POST',
            body: jsonbody,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok) 
                status.success = true;
            else {
                toast.dismiss(toastid);
                res.text().then(text => {
                    status.error = text
                    try {
                        let json = JSON.parse(text);
                        if (json["errors"]) {
                            for (let value of Object.values(json["errors"]))
                                status.error = value.pop(); 
                        }
                    } catch {console.log(""); }
      
                    toast.error(status.error);
                })
            }
            return status;
        }).catch(() => {
            status.error = "Something broke. Try again?"
            toast.dismiss(toastid);
            toast.warning(status.error);
        });
    }
    /**
     * 
     * @param {string} username 
     * @param {string} password 
     * @returns {Object} a object containing "error" message and boolean "success"
     */
    login = async (username, password) => {
        const toastid = toast.info("Logging in.");
        var status = {
            error: "",
            success: false
        }
        const uri = API_URI + "Auth/SignIn"
        const jsonbody = JSON.stringify({ Username: username, Password: password });
        return await fetch(uri, {
            method: 'POST',
            body: jsonbody,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                status.success = true;
                res.text().then(token => {this.updateUserState(token)}) 
            }
            else {
                toast.dismiss(toastid);
                res.text().then(text => {
                    status.error = text
                    try {
                        let json = JSON.parse(text);
                        if (json["errors"]) {
                            for (let value of Object.values(json["errors"]))
                                status.error = value.pop(); 
                        }
                    } catch {console.log(""); }
                    toast.error(status.error);
                })
            }
            return status;
        }).catch(() => {
            status.error = "Something broke. Try again?";
            toast.dismiss(toastid);
            toast.warning(status.error);
            return status;
        });
    }
    navigateHome = () => {
        window.location.replace("/");
    }
    navigateDashboard = () => {
        window.location.replace("/Dashboard");
    }
    unauthorized = () => {
        this.setToken("");
        this.setState({ user: { name: "", token: "", id: "", isAuthenticated: false } });
    }
    updateUserState = (token) => {
        this.setToken(token);
        const newUser = this.getUserAuthentication();
        this.setState({ user: newUser });
    }
    getUserAuthentication = () => {
        const token = this.getToken();
        const username = this.getUserName();
        const id = this.getUserID();
        const auth = token ? true : false;
        return {
            name: username,
            token: token,
            id: id,
            isAuthenticated: auth
        }
    }
    getUserName = () => {
        const token = this.getToken();
        if (!token) return "";
        const decoded = jwt_decode(token);
        const username = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        return username;
    }

    getUserID = () => {
        const token = this.getToken();
        if (!token) return "";
        const decoded = jwt_decode(token);
        const userid = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        return userid;
    }
    /**
     * returns the existing token string
     */
    getToken = () => {
        const token = localStorage.getItem("x-auth-token") ? localStorage.getItem("x-auth-token") : "";
        return token;
    }
    setToken = (token) => {
        localStorage.setItem("x-auth-token", token);
    }
    render() {
        return (
            <Provider value={this.state}>
                {this.props.children}
            </Provider>
        );
    }
}
export { AuthProvider, Consumer as AuthConsumer };