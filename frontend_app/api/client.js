import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// REPLACE WITH YOUR COMPUTER'S IP ADDRESS
// e.g., 'http://192.168.1.5:8000'
// Use 'http://localhost:8000' ONLY for iOS Simulator
const API_URL = 'http://192.168.1.5:8000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
    async (config) => {
        try {
            const token = await SecureStore.getItemAsync('userToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error fetching token:', error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
