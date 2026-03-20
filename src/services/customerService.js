import api from './api';
import API_CONFIG from '../config/apiConfig';

const customerService = {
    searchArtisans: async (searchData, params = { pageNumber: 1, pageSize: 10 }) => {
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
    },
    cancelBooking: async (bookingId, reason) => {
        try {
            // Using query param for the reason to ensure it reaches the backend correctly
            const response = await api.put(API_CONFIG.ENDPOINTS.CUSTOMERS.CANCEL_BOOKING(bookingId), null, {
                params: { reason: reason }
            });
            return response.data;
        } catch (error) {
            console.error("Cancel Booking Error:", error.response?.data || error.message);
            throw error;
        }
    }
};

export default customerService;
