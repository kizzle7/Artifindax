const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const API_CONFIG = {
    BASE_URL,
    ENDPOINTS: {
        AUTH: {
            SIGN_UP: '/auth/sign-up',
            VERIFY_PHONE: '/auth/verify-phone-number',
            INITIATE_OTP: '/auth/initiate-otp',
            FORGOT_PASSWORD_OTP: '/auth/initiate-forgot-password-otp',
            CHANGE_PASSWORD: '/auth/change-password',
            REGISTER_DEVICE: '/auth/register-device',
            LOGIN: '/login',
        },
        CATEGORIES: {
            LIST: '/api/v1/categories',
            SKILLS: (categoryId) => `/api/v1/categories/${categoryId}/skills`,
            POPULAR_SERVICES: '/api/v1/categories/popular-services',
        },
        KYC: {
            CUSTOMER: '/api/v1/kyc/customer',
            ARTISAN: '/api/v1/kyc/artisan',
        },
        CUSTOMERS: {
            SEARCH_ARTISANS: '/api/v1/customers/search-artisans',
        },
        USER: {
            PROFILE: '/api/v1/profile',
            ADD_ADDRESS: '/api/v1/profile/add-customer-addresses',
        },
        FILE_UPLOAD: {
            UPLOAD: '/api/v1/file-uploads/upload',
        },
        ABUSE_REPORT: {
            REPORT: '/api/v1/abuse-reports/report',
        }
    }
};

export default API_CONFIG;
