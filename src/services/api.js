import axios from 'axios';
import API_CONFIG from '../config/apiConfig';

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the token to headers
api.interceptors.request.use(
    (config) => {
        // Public endpoints that don't need a token
        const publicEndpoints = [
            '/api/v1/categories',
            '/api/v1/customers/search-artisans',
            '/auth/sign-up',
            '/auth/verify-phone-number',
            '/auth/initiate-otp',
            '/auth/register-device',
            '/login'
        ];

        // Check if the current request is for a public endpoint
        const isPublic = publicEndpoints.some(endpoint => config.url.includes(endpoint));

        if (!isPublic) {
            const token = localStorage.getItem('artifinda_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Log errors or handle specific status codes (e.g., 401)
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
