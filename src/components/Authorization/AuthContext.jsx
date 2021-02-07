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
    logout: () => { },
    unauthorized: () => { },
    checkauthorization: () => { },
    getUserName: () => { },
    getUserId: () => { }
}); // Create a context object
