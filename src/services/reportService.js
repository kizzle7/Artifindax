import api from './api';
import { API_CONFIG } from '../config/apiConfig';

const reportService = {
    /**
     * Submit an abuse report
     * @param {Object} reportData - The report data
     * @param {string} reportData.reportType - The type of report (e.g., 'HARASSMENT')
     * @param {string} reportData.details - The details of the report
     * @returns {Promise<Object>} - The response from the server
     */
    reportAbuse: async (reportData) => {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.ABUSE_REPORT.REPORT, reportData);
            return response.data;
        } catch (error) {
            console.error('Abuse Report Error:', error);
            throw error;
        }
    }
};

export default reportService;
