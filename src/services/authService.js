import api from './api';
import API_CONFIG from '../config/apiConfig';

const authService = {
    getDeviceIdentifier: () => {
        let deviceId = localStorage.getItem('artifinda_device_id');
        if (!deviceId) {
            deviceId = crypto.randomUUID();
            localStorage.setItem('artifinda_device_id', deviceId);
        }
        return deviceId;
    },

    setToken: (token) => {
        localStorage.setItem('artifinda_token', token);
    },

    getToken: () => {
        return localStorage.getItem('artifinda_token');
    },

    clearToken: () => {
        localStorage.removeItem('artifinda_token');
        localStorage.removeItem('artifinda_role');
        localStorage.removeItem('artifinda_location');
    },

    setLocation: (address, latitude, longitude) => {
        localStorage.setItem('artifinda_location', JSON.stringify({ address, latitude, longitude }));
    },

    getLocation: () => {
        try {
            return JSON.parse(localStorage.getItem('artifinda_location')) || null;
        } catch {
            return null;
        }
    },

    setRole: (role) => {
        localStorage.setItem('artifinda_role', role);
    },

    getRole: () => {
        return localStorage.getItem('artifinda_role');
    },

    signUp: async (payload) => {
        try {
            // Expected payload: { firstName, lastName, countryCode, phoneNumber, password, deviceType, deviceIdentifier, accountType, loginPin }
            const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.SIGN_UP, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    verifyPhoneNumber: async (payload) => {
        try {
            // Expected payload: { signupRef, countryCode, phoneNumber, otp }
            const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.VERIFY_PHONE, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    initiateOtp: async (payload) => {
        try {
            // Expected payload: { countryCode, phoneNumber, otpType: "PHONE_VERIFICATION" }
            const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.INITIATE_OTP, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    initiateForgotPasswordOtp: async (payload) => {
        try {
            // Expected payload: { countryCode, phoneNumber, otpType: "FORGOT_PASSWORD" }
            const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD_OTP, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    changePassword: async (payload) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.CHANGE_PASSWORD, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    registerDevice: async (payload) => {
        // payload: { deviceIdentifier, deviceType, countryCode, phoneNumber, otp }
        try {
            await api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER_DEVICE, payload);
        } catch (err) {
            throw err.response?.data || err.message;
        }
    },

    login: async (payload) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, payload);
            if (response.data?.token) {
                authService.setToken(response.data.token);
            }
            if (response.data?.role) {
                authService.setRole(response.data.role);
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    submitCustomerOnboarding: async (payload) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.KYC.CUSTOMER, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    submitArtisanOnboarding: async (payload) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.KYC.ARTISAN, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default authService;
