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
    },
    bookArtisan: async (bookingData) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.CUSTOMERS.BOOK_ARTISAN, bookingData);
            return response.data;
        } catch (error) {
            console.error("Booking API Error:", error.response?.data || error.message);
            throw error;
        }
    },
    getBookings: async (params = {}) => {
        try {
            console.log("[customerService] GET Bookings URL:", API_CONFIG.ENDPOINTS.CUSTOMERS.GET_BOOKINGS, "with params:", params);
            const response = await api.get(API_CONFIG.ENDPOINTS.CUSTOMERS.GET_BOOKINGS, {
                params: params
            });
            return response.data;
        } catch (error) {
            console.error("Get Bookings API Error:", error.response?.data || error.message);
            throw error;
        }
    }
};

export default customerService;
