import api from './api';
import API_CONFIG from '../config/apiConfig';

const customerService = {
    searchArtisans: async (searchData) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.CUSTOMERS.SEARCH_ARTISANS, searchData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default customerService;
