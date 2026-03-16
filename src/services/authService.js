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
            console.log('[AuthService] Login Response:', response.data);
            
            if (response.data?.token) {
                authService.setToken(response.data.token);
            }
            
            // Flexible role detection
            let role = response.data?.role;
            
            // Fallback 1: Check accounts array (common in this app)
            if (!role && response.data?.accounts && response.data.accounts.length > 0) {
                role = response.data.accounts[0].accountType;
            }
            
            // Fallback 2: Check nested user object
            if (!role && response.data?.user?.role) {
                role = response.data.user.role;
            }

            // Fallback 3: If still no role but we have a token, fetch the profile
            if (!role && response.data?.token) {
                try {
                    const profileRes = await api.get(API_CONFIG.ENDPOINTS.USER.PROFILE);
                    const accounts = profileRes.data?.accounts || [];
                    const artisanAccount = accounts.find(a => a.accountType === 'ARTISAN');
                    if (artisanAccount) {
                        role = 'ARTISAN';
                    } else if (accounts.length > 0) {
                        role = accounts[0].accountType;
                    }
                } catch (e) {
                    console.warn('[AuthService] Failed to fetch profile to resolve role', e);
                }
            }

            if (role) {
                authService.setRole(role);
            } else {
                authService.setRole('CUSTOMER'); // Default to customer if totally unknown
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
