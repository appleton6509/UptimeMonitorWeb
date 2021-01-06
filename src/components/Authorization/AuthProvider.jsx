import React, { Component } from 'react';
import { API_URI } from "../Settings/API.js";
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from 'react-toastify';
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
            login: (username, password) => { },
            createLogin: (username, password) => { },
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
        const create = this.createLogin;
        const login = this.login;
        const unauthorized = this.unauthorized;
        const checkauthorization = this.checkauthorization;
        this.setState({ user, login, create, logout, unauthorized, checkauthorization });
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
        const jsonbody = JSON.stringify({ Username: username, Password: password });
        const uri = API_URI + 'Auth/SignUp';

        var status = {
            error: "",
            success: false
        }
        fetch(uri, {
            method: 'POST',
            body: jsonbody,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok)
                status.success = true
            return res.text()
        }).then(message => {
            if (!status.success)
                status.error = message
        }).catch(() => {
            status.error = "something went wrong"
        });
        return status
    }
    /**
     * 
     * @param {string} username 
     * @param {string} password 
     * @returns {Object} a object containing "error" message and boolean "success"
     */
    login = async (username, password) => {
        const loginToastId = toast.info("Logging in.");
        var status = {
            error: "",
            success: false
        }
        const uri = API_URI + "Auth/SignIn"
        const jsonbody = JSON.stringify({ Username: username, Password: password });
        await fetch(uri, {
            method: 'POST',
            body: jsonbody,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok)
                status.success = true
            return res.text()
        }).then(reply => {
            if (status.success) {
                this.updateUserState(reply); //token
                this.navigateHome();
            }
            else {
                toast.dismiss(loginToastId);
                toast.error(reply);
                status.error = reply;
            }
        }).catch(() => {
            status.error = "Something broke. please try again.";
            toast.dismiss(loginToastId);
            toast.warning(status.error);
        });
        return new Promise((resolve) => {
            resolve(status);
        });
    }
    navigateHome = () => {
        window.location.replace("/");
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
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {this.props.children}
            </Provider>
        );
    }
}
export { AuthProvider, Consumer as AuthConsumer };