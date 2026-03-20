import api from './api';
import API_CONFIG from '../config/apiConfig';

const artisanService = {
    getBookings: async (params = {}) => {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.ARTISANS.GET_BOOKINGS, {
                params: params
            });
            return response.data;
        } catch (error) {
            console.error("Artisan Get Bookings Error:", error.response?.data || error.message);
            throw error;
        }
    },
    respondToBooking: async (responseDetails) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.ARTISANS.RESPOND_TO_BOOKING, responseDetails);
            return response.data;
        } catch (error) {
            console.error("Artisan Respond to Booking Error:", error.response?.data || error.message);
            throw error;
        }
    }
};

export default artisanService;
