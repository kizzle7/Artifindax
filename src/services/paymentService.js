import api from './api';
import API_CONFIG from '../config/apiConfig';

const paymentService = {
    getConfigurations: async () => {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.CONFIGURATIONS.GET);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    initiateSubscription: async (payload) => {
        try {
            // payload: { artisanCategoryId, tier }
            const response = await api.post(API_CONFIG.ENDPOINTS.PAYMENTS.INIT_SUBSCRIPTION, payload);
            return response.data; // Expected to contain a checkout URL
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    verifySubscription: async (reference) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.PAYMENTS.VERIFY_SUBSCRIPTION, { reference });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getCurrentSubscription: async (categoryId) => {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.PAYMENTS.CURRENT_SUBSCRIPTION(categoryId));
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getPaymentHistory: async (pageNumber = 1, pageSize = 10) => {
        try {
            const response = await api.get(`${API_CONFIG.ENDPOINTS.PAYMENTS.ALL_PAYMENTS}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    initiateBoost: async (payload) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.PAYMENTS.INIT_BOOST, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    verifyBoost: async (reference) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.PAYMENTS.VERIFY_BOOST, { reference });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getCurrentBoost: async (categoryId) => {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.PAYMENTS.CURRENT_BOOST(categoryId));
            return response.data;
        } catch (error) {
            // Silently fail if no boost active
            return null;
        }
    }
};

export default paymentService;
