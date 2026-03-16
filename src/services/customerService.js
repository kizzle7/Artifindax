import api from './api';
import API_CONFIG from '../config/apiConfig';

const customerService = {
    searchArtisans: async (searchData, params = { page: 1, size: 20 }) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.CUSTOMERS.SEARCH_ARTISANS, searchData, {
                params: params
            });
            return response.data;
        } catch (error) {
            console.error("Search API Error:", error.response?.data || error.message);
            throw error;
        }
    }
};

export default customerService;
