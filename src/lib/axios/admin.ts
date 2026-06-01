// src/lib/axios/admin.ts

import axios from "axios";
import { token } from "../auth/token";

const adminAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL,
    withCredentials: true,
});

adminAxios.interceptors.request.use((config) => {

    const accessToken = token.get();

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;

});

adminAxios.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            token.remove();

            if (typeof window !== "undefined") {
                window.location.href = "/admin/login";
            }

        }

        return Promise.reject(error);

    }

);

export default adminAxios;