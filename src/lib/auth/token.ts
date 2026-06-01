// src/lib/auth/token.ts

export const ACCESS_TOKEN_KEY = "axismart_access_token";

export const token = {
    get: () => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },

    set: (value: string) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, value);
    },

    remove: () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    },
};