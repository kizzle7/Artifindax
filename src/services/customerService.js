import api from './api';
import API_CONFIG from '../config/apiConfig';

const customerService = {
    searchArtisans: async (searchData, params = { page: 1, size: 20 }) => {
        try {
            console.log(`[Service] Fetching artisans (GET with Body). Params:`, params, "Body:", searchData);

            const response = await api.get(API_CONFIG.ENDPOINTS.CUSTOMERS.SEARCH_ARTISANS, {
                params: params,
                data: searchData // Axios allows data in GET requests
            });
            return response.data;
        } catch (error) {
            console.error("Search API Error:", error.response?.data || error.message);
            throw error;
        }
    }
};

export default customerService;
