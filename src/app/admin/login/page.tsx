"use client";

import { useState } from "react";
import { User2, Lock } from "lucide-react";
import { token } from "@/lib/auth/token";
import { useAuthStore } from "@/lib/axios/auth-store";
import { adminAuthService } from "@/lib/axios/admin-auth.service";
import { decodeJWT } from "@/lib/auth/decode-jwt";


export default function AdminLoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const setUser = useAuthStore((s) => s.setUser);

    async function login() {
        try {
            setLoading(true);

            const data =
                await adminAuthService.login({
                    username,
                    password,
                });

            const accessToken = data.value;

            token.set(accessToken);

            const decodedUser = decodeJWT(accessToken);

            if (!decodedUser) {
                throw new Error("Invalid JWT");
            }

            setUser(
                decodedUser
            );

            window.location.href = "/admin";

        } catch (err) {

            console.error(err);

        } finally {
            setLoading(false);
        }
    }

    return (

        <div className=" min-h-screen flex items-center justify-center bg-slate-950 p-8 ">
            <div className=" w-full max-w-[520px] rounded-[40px] border border-slate-800 bg-slate-900 p-10 ">
                <h1 className=" text-4xl font-black text-white ">
                    Admin Login
                </h1>

                <div className="mt-10 space-y-6">

                    <Field
                        icon={<User2 size={18} />}
                        placeholder="Username"
                        value={username}
                        onChange={setUsername}
                    />

                    <Field
                        icon={<Lock size={18} />}
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={setPassword}
                    />
                </div>

                <button
                    onClick={login}
                    disabled={loading}
                    className=" mt-8 w-full rounded-2xl bg-blue-600 py-4 font-bold text-white "
                >
                    Login
                </button>
            </div>
        </div>
    );
}

function Field({ icon, placeholder, type, value, onChange }: any) {
    return (
        <div className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800 px-5 ">
            {icon}
            <input
                type={type || "text"}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent py-5 outline-none text-white "
            />
        </div>
    );
}