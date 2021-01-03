import React, { Component } from 'react';
import { UserContext } from './UserContext';
import { API_URI } from "../Settings/API.js";
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from 'react-toastify';

export class AuthProvider extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: "",
                token: "",
                id: "",
                isAuthenticated: ""
            },
            login: (username,password) => {},
            createLogin: (username,password) => {},
            logout: () => {}
        }
    }
    componentDidMount() {
        const user = this.getUserAuthentication();
        const logout = this.logout;
        const create = this.createLogin;
        const login = this.login;
        this.setState({user,login,create,logout});
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
        }).catch(err => {
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
          toast.info("Logging in.");
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
        }).then(message => {
            if (status.success) {
                this.updateUserState(message);
                this.navigateHome();
            }
            else {
                toast.error(message);
                status.error = message;
            }
        }).catch(err => {
            status.error = "Something broke. please try again.";
            toast.warning(status.error);
        });
        return new Promise((resolve, reject) => {
            resolve(status);
        });
    }
    navigateHome = () => {
        window.location.replace("/");
    }
    updateUserState = (token) => {
        this.setToken(token);
        const newUser = this.getUserAuthentication();
        this.setState({user: newUser});
    }
    getUserAuthentication = () => {
        const username = this.getUserName();
        const token = this.getToken();
        const id = this.getUserID();
        const auth = this.getToken() ? true : false;
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

     getUserID = () =>  {
        const token = this.getToken();
        if (!token) return "";
        const decoded = jwt_decode(token);
        const userid = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        return userid;
    }
    /**
     * returns the existing token string
     */
     getToken = () =>  {
        return localStorage.getItem("x-auth-token")
    }
     setToken = (token) =>  {
        localStorage.setItem("x-auth-token", token);
    }
    render() {
        return (
            <UserContext.Provider value={this.state}>
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
            </UserContext.Provider>
        );
    }
}