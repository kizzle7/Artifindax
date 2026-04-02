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
            const errorData = response.data;
            const message = errorData?.message || errorData?.error || (response.status === 403 ? 'Account restricted or locked' : 'Session expired');
            
            console.warn('[API] Security error, clearing session...', { status: response.status, message });
            
            // Store error for the login page to display
            localStorage.setItem('artifinda_last_error', message);
            
            // Clear identity
            localStorage.removeItem('artifinda_token');
            localStorage.removeItem('artifinda_role');
            
            if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
                window.location.replace('/login');
            }
        }

        console.error('API Error:', response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
