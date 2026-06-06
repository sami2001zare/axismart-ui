// src/lib/auth/auth-store.ts

'use client';

import { create } from 'zustand';

interface AuthStore {
    user: any;

    authenticated: boolean;

    setUser: (user: any) => void;

    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,

    authenticated: false,

    setUser: (user) =>
        set({
            user,
            authenticated: true,
        }),

    logout: () =>
        set({
            user: null,
            authenticated: false,
        }),
}));
