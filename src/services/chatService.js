import api from './api';
import API_CONFIG from '../config/apiConfig';

const chatService = {
    getChats: async (bookingId) => {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.CHAT.GET_CHATS(bookingId));
            return response.data;
        } catch (error) {
            console.error("Get Chats API Error:", error.response?.data || error.message);
            throw error;
        }
    },
    sendMessage: async (messageData) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.CHAT.SEND_MESSAGE, messageData);
            return response.data;
        } catch (error) {
            console.error("Send Message API Error:", error.response?.data || error.message);
            throw error;
        }
    },
    uploadFile: async (formData) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.FILE_UPLOAD.UPLOAD, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            console.error("File Upload API Error:", error.response?.data || error.message);
            throw error;
        }
    }
};

export default chatService;
