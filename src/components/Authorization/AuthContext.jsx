import React from 'react';

export const AuthContext = React.createContext({
    user: {
        name: "",
        token: "",
        id: "",
        isAuthenticated: ""
    },
    login: async (username, password) => { },
    createLogin: async (username, password) => { },
    updateLogin: async (username, password) => { },
    logout: () => { },
    unauthorized: () => { },
    checkauthorization: () => { },
    getUserName: () => { }
}); // Create a context object
