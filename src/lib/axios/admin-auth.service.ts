// src/services/admin-auth.service.ts
import adminAxios from "@/lib/axios/admin";

export const adminAuthService = {

    login: async (data: {
        username: string;
        password: string;
    }) => {

        const response = await adminAxios.post(
            "/auth/login",
            data
        );

        return response.data;

    },
};