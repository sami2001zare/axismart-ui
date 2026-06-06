// src/lib/auth/decode-jwt.ts

import { jwtDecode } from 'jwt-decode';

export interface AdminJwtPayload {
    sub: string;
    username: string;
    role: string;
    exp: number;
    iat: number;
}

export function decodeJWT(accessToken: string) {
    try {
        return jwtDecode<AdminJwtPayload>(accessToken);
    } catch {
        return null;
    }
}
