// src/lib/auth/auth-store.ts

'use client';

import { create } from 'zustand';

interface User {
    id: string;
    email: string;
    name?: string;
    role?: string;
    avatar?: string;
    // Add other fields your backend returns
}

interface AuthStore {
    user: User | null;
    authenticated: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    authenticated: false,
    setUser: (user) =>
        set({
            user,
            authenticated: !!user, // true if user exists
        }),
    logout: () =>
        set({
            user: null,
            authenticated: false,
        }),
}));
