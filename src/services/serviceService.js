import api from './api';
import API_CONFIG from '../config/apiConfig';

const serviceService = {
    getPopularServices: async () => {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.CATEGORIES.POPULAR_SERVICES);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default serviceService;
