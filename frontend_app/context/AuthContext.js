import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../api/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await api.post('/auth/login', {
                username: email, // OAuth2 expects 'username'
                password,
            });

            const { access_token } = response.data;
            setUserToken(access_token);
            await SecureStore.setItemAsync('userToken', access_token);

            // Fetch user details
            await fetchUserInfo();
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (fullName, email, password) => {
        setIsLoading(true);
        try {
            await api.post('/auth/signup', {
                full_name: fullName,
                email,
                password,
            });
            // Auto login after signup
            await login(email, password);
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const guestLogin = async () => {
        setIsLoading(true);
        try {
            const response = await api.post('/auth/guest');
            const { access_token } = response.data;
            setUserToken(access_token);
            await SecureStore.setItemAsync('userToken', access_token);

            // Fetch user details
            await fetchUserInfo();
        } catch (error) {
            console.error('Guest login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        setUserToken(null);
        setUserInfo(null);
        await SecureStore.deleteItemAsync('userToken');
        setIsLoading(false);
    };

    const fetchUserInfo = async () => {
        try {
            const response = await api.get('/auth/me');
            setUserInfo(response.data);
        } catch (error) {
            console.error('Fetch user info error:', error);
        }
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let token = await SecureStore.getItemAsync('userToken');
            if (token) {
                setUserToken(token);
                // Verify token validity by fetching user info
                await fetchUserInfo();
            }
        } catch (e) {
            console.log('Login check error ' + e);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, signup, guestLogin, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
