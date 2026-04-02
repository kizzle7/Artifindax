import api from './api';
import API_CONFIG from '../config/apiConfig';

/**
 * Service to handle KYC verification for customers and artisans.
 */
const kycService = {
    /**
     * Submit KYC verification for a customer.
     * @param {Object} payload The KYC data.
     * @returns {Promise<Object>} The response data.
     */
    verifyCustomer: async (payload) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.KYC.CUSTOMER, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Submit KYC verification for an artisan.
     * @param {Object} payload The KYC data.
     * @returns {Promise<Object>} The response data.
     */
    verifyArtisan: async (payload) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.KYC.ARTISAN, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default kycService;
