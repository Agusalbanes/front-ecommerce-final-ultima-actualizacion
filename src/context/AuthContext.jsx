// context/AuthContext.js
import { createContext } from 'react';

const AuthContext = createContext({
    user: null,
    login: () => {},
    register: () => {},
    logout: () => {},
    loading: false, 
    error: "",
    success: "",
    clearError: () => {},
    clearSuccess: () => {},
    clearAllMessages: () => {},
    isAuthenticated: false,
    isAdmin: false
});

export default AuthContext;