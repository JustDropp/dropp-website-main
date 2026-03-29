import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../core/services/AuthService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initAuth = () => {
            try {
                const storedToken = AuthService.getToken();
                if (storedToken) {
                    const userData = AuthService.getUserFromToken();
                    if (userData) {
                        setToken(storedToken);
                        setUser(userData);
                        setIsAuthenticated(true);
                    }
                }
            } catch (err) {
                console.error('Error initializing auth:', err);
                AuthService.logout();
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    /**
     * Login user
     * @param {string} identifier - Email or username
     * @param {string} password - User password
     */
    const login = async (identifier, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await AuthService.login(identifier, password);
            const userData = AuthService.getUserFromToken();

            setToken(response.token);
            setUser(userData);
            setIsAuthenticated(true);

            return { success: true, data: response };
        } catch (err) {
            const errorMessage = err.message || 'Login failed. Please try again.';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Signup new user
     * @param {Object} userData - User registration data
     */
    const signup = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await AuthService.signup(userData);
            return { success: true, data: response };
        } catch (err) {
            const errorMessage = err.message || 'Signup failed. Please try again.';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Logout user
     */
    const logout = () => {
        AuthService.logout();
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setError(null);
    };

    /**
     * Clear error
     */
    const clearError = () => {
        setError(null);
    };

    const value = {
        user,
        token,
        isAuthenticated,
        loading,
        error,
        login,
        signup,
        logout,
        clearError,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
