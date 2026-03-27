import api from './api';
import API_CONFIG from '../config/apiConfig';

const userService = {
    /**
     * Fetch the current user's profile information.
     * @returns {Promise<Object>} The user profile data.
     */
    getProfile: async () => {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.USER.PROFILE);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Update the current user's profile information.
     * @param {Object} payload The data to update.
     * @returns {Promise<Object>} The updated profile data.
     */
    updateProfile: async (payload) => {
        try {
            const response = await api.put(API_CONFIG.ENDPOINTS.USER.PROFILE, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Add a new address to the customer's profile.
     * @param {Object} payload The address data.
     * @returns {Promise<Object>} The response data.
     */
    addAddress: async (payload) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.USER.ADD_ADDRESS, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Add a new address to the artisan's profile.
     * @param {Object} payload The address data.
     * @returns {Promise<Object>} The response data.
     */
    addArtisanAddress: async (payload) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.USER.ADD_ARTISAN_ADDRESS, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default userService;
