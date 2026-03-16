import api from './api';
import { API_CONFIG } from '../config/apiConfig';

const fileService = {
    /**
     * Upload a file to the server
     * @param {File} file - The file object to upload
     * @returns {Promise<Object>} - The response from the server containing the file URL
     */
    upload: async (file) => {
        const formData = new FormData();
        // The backend expects 'files' (plural) for the file part.
        formData.append('files', file);

        try {
            // We use a custom axios instance config to override the global application/json default
            const response = await api.post(API_CONFIG.ENDPOINTS.FILE_UPLOAD.UPLOAD, formData, {
                headers: {
                    // Setting Content-Type to undefined allows axios to set it automatically with the correct boundary
                    'Content-Type': undefined,
                    'Accept': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('File Upload Error:', error);
            throw error;
        }
    }
};

export default fileService;
