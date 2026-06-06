// src/lib/axios/customer.ts

import axios from 'axios';
import { token } from '../auth/token';

const customerAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_CUSTOMER_API_URL,
    withCredentials: true,
});

customerAxios.interceptors.request.use((config) => {
    const accessToken = token.get();

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

customerAxios.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status === 401) {
            token.remove();

            if (typeof window !== 'undefined') {
                window.location.href = '/customer/login';
            }
        }

        return Promise.reject(error);
    }
);

export default customerAxios;
