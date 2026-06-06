// src/services/customer-auth.service.ts

import customerAxios from '@/lib/axios/customer';

export const customerAuthService = {
    login: async (data: { phone: string; password: string }) => {
        const response = await customerAxios.post('/login_pass', data);

        return response.data;
    },

    verifyRegistration: async (data: { phone: string; otp: string }) => {
        const response = await customerAxios.post('/register_verification', data);

        return response.data;
    },

    register: async (data: {
        firstName: string;
        lastName: string;
        phone: string;
        password: string;
    }) => {
        const response = await customerAxios.post('/register', data);

        return response.data;
    },

    requestOtp: async (phone: string) => {
        const response = await customerAxios.post('/auth/otp/request', { phone });

        return response.data;
    },

    verifyOtp: async (data: { phone: string; otp: string }) => {
        const response = await customerAxios.post('/verify_login_otp', data);

        return response.data;
    },
};
