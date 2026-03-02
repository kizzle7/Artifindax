import api from './api';
import API_CONFIG from '../config/apiConfig';

const categoryService = {
    getCategories: async () => {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.CATEGORIES.LIST);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getSkills: async (categoryId) => {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.CATEGORIES.SKILLS(categoryId));
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default categoryService;
