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
            '/api/v1/wait-list',
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
        const { response } = error;
        
        // Handle 401 (Unauthorized) or 403 (Forbidden)
        if (response && (response.status === 401 || response.status === 403)) {
            console.warn('[API] Unauthorized/Forbidden error, clearing session...', response.status);
            
            // Clear local storage and redirect to login
            localStorage.removeItem('artifinda_token');
            localStorage.removeItem('artifinda_role');
            
            // Only redirect if not already on the login page to avoid loops
            if (!window.location.pathname.includes('/login')) {
                window.location.replace('/login');
            }
        }

        console.error('API Error:', response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
