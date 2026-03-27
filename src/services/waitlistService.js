import api from './api';
import API_CONFIG from '../config/apiConfig';

const waitlistService = {
    /**
     * Join the waitlist.
     * @param {Object} payload The waitlist data { fullName, emailAddress, phoneNumber }.
     * @returns {Promise<Object>} The response data.
     */
    joinWaitlist: async (payload) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.WAITLIST.JOIN, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default waitlistService;
