'use client';

import { useState, useEffect, ReactNode } from 'react';
import { Phone, Lock, AlertCircle, Loader2, ShieldCheck, ChevronLeft } from 'lucide-react';

import { token } from '@/lib/auth/token';
import { useAuthStore } from '@/lib/axios/auth-store';
import { customerAuthService } from '@/lib/axios/customer-auth.service';
import customerAxios from '@/lib/axios/customer';
import { toast, ToastContainer } from 'react-toastify';

export default function CustomerLoginPage() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [otp] = useState('');
    const [mode, setMode] = useState<'password' | 'otp'>('password');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [otpEnabled, setOtpEnabled] = useState(false);
    const [shake, setShake] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const setUser = useAuthStore((s) => s.setUser);

    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    useEffect(() => {
        if (mode === 'otp') {
            customerAxios
                .post('/login_otp', {
                    phone: phone,
                })
                .then(() => {
                    toast.success('کد یکبار مصرف ارسال شد');
                })
                .catch(() => {
                    toast.error('در این لحطه امکان ارسال کد نیست. لطفا دوباره سعی کنید');
                });
        }
    }, [mode, phone]);

    async function loginPassword() {
        setError('');

        try {
            setLoading(true);
            const data = await customerAuthService.login({
                phone,
                password,
            });

            token.set(data.accessToken);

            setUser(data.user);

            window.location.href = '/customer/dashboard';
        } catch {
            const attempts = failedAttempts + 1;
            setFailedAttempts(attempts);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            if (attempts >= 3) {
                setOtpEnabled(true);
                setError('۳ بار رمز اشتباه وارد شد. ورود پیامکی فعال شد.');
            } else {
                setError(`رمز عبور اشتباه است. (${attempts}/3)`);
            }
        } finally {
            setLoading(false);
        }
    }

    async function requestOtp() {
        try {
            setLoading(true);
            await customerAuthService.requestOtp(phone);
            setCountdown(60);
            setMode('otp');
        } catch {
            setError('ارسال کد تایید ناموفق بود.');
        } finally {
            setLoading(false);
        }
    }

    async function verifyOtp() {
        try {
            setLoading(true);
            const data = await customerAuthService.verifyOtp({
                phone,
                otp: otp,
            });

            token.set(data.accessToken);
            setUser(data.user);
            window.location.href = '/customer/dashboard';
        } catch {
            setError('کد تایید نامعتبر است.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-white p-8">
            <div className="grid w-full max-w-[1250px] overflow-hidden rounded-[42px] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.08)] xl:grid-cols-[1fr_560px]">
                <div className="hidden flex-col justify-between bg-gradient-to-br from-blue-700 via-blue-600 to-slate-900 p-14 text-white xl:flex">
                    <div>
                        <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 backdrop-blur">
                            <ShieldCheck size={16} />
                            ورود امن بلبرینگ پارسا
                        </div>

                        <h2 className="mt-10 text-6xl leading-[1.2] font-black">
                            پلتفرم فروش صنعتی نسل جدید
                        </h2>

                        <p className="mt-8 max-w-[420px] text-base leading-9 text-blue-100">
                            مدیریت خرید، سفارش، عمده فروشی و ارتباط مستقیم با صنعت.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <Stat value="10K+" label="مشتری فعال" />
                        <Stat value="24/7" label="پشتیبانی" />
                        <Stat value="500+" label="محصول" />
                        <Stat value="99%" label="رضایت کاربران" />
                    </div>
                </div>

                <div className="relative p-12 xl:p-14">
                    <div className="absolute top-[-90px] right-[-90px] h-[220px] w-[220px] rounded-full bg-blue-100 blur-3xl" />
                    <div
                        className={`relative transition-all duration-300 ${shake ? 'animate-[shake_0.35s_linear]' : ''} `}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-5xl font-black text-slate-900">ورود مشتریان</h1>

                                {/* <p className=" mt-4 text-sm text-slate-500 ">
                                    ورود امن به پنل مشتری بلبرینگ پارسا
                                </p> */}
                            </div>

                            {/* <div className=" rounded-3xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 ">
                                {mode === "password" ? "Password Login" : "SMS Login"}
                            </div> */}
                        </div>

                        {error && (
                            <div className="mt-8 flex items-start gap-4 rounded-3xl border border-red-200 bg-red-50 p-5 text-red-700">
                                <AlertCircle size={20} />
                                <p className="text-sm leading-8">{error}</p>
                            </div>
                        )}

                        <div className="mt-10 space-y-6">
                            <Field
                                type="text"
                                icon={<Phone size={18} />}
                                placeholder="شماره موبایل"
                                value={phone}
                                onChange={setPhone}
                            />

                            {mode === 'password' && (
                                <Field
                                    icon={<Lock size={18} />}
                                    type="password"
                                    placeholder="رمز عبور"
                                    value={password}
                                    onChange={setPassword}
                                />
                            )}

                            {/* {mode === "otp" && (
                                <Field
                                    type=""
                                    icon={<KeyRound size={18} />}
                                    placeholder="کد تایید پیامکی"
                                    value={otp}
                                    onChange={setOtp}
                                />
                            )} */}
                        </div>

                        {mode === 'password' && (
                            <>
                                <div className="mt-6 flex items-center justify-between">
                                    <button
                                        onClick={() => {
                                            setOtpEnabled(true);
                                        }}
                                        className="text-sm font-bold text-blue-600"
                                    >
                                        رمز عبور را فراموش کرده‌ام
                                    </button>

                                    <div className="text-xs text-slate-400">
                                        {failedAttempts}/3 تلاش
                                    </div>
                                </div>

                                <button
                                    disabled={loading}
                                    onClick={loginPassword}
                                    className="group mt-8 flex w-full items-center justify-center gap-3 rounded-3xl bg-blue-600 py-5 font-black text-white transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700"
                                >
                                    {loading ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        <>
                                            ورود به حساب
                                            <ChevronLeft
                                                size={18}
                                                className="transition group-hover:-translate-x-1"
                                            />
                                        </>
                                    )}
                                </button>
                            </>
                        )}

                        <div
                            className={`overflow-hidden transition-all duration-500 ${otpEnabled ? 'mt-10 max-h-[420px] opacity-100' : 'max-h-0 opacity-0'} `}
                        >
                            <div className="rounded-[34px] border border-blue-200 bg-gradient-to-br from-blue-50 to-slate-50 p-7">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900">
                                            ورود پیامکی
                                        </h3>

                                        <p className="mt-3 text-sm text-slate-500">
                                            احراز هویت بدون رمز عبور
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setMode('otp')}
                                        className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
                                    >
                                        فعال‌سازی
                                    </button>
                                </div>

                                {mode === 'otp' && (
                                    <div className="mt-8">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <button
                                                onClick={requestOtp}
                                                disabled={loading || countdown > 0}
                                                className="rounded-2xl border border-slate-200 bg-white py-4 font-bold transition hover:border-blue-300"
                                            >
                                                {countdown > 0 ? `${countdown}s` : 'ارسال کد'}
                                            </button>

                                            <button
                                                onClick={verifyOtp}
                                                disabled={loading}
                                                className="rounded-2xl bg-blue-600 py-4 font-bold text-white"
                                            >
                                                {loading ? 'درحال بررسی...' : 'تایید ورود'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx global>{`
                    @keyframes shake {
                        0% {
                            transform: translateX(0);
                        }

                        25% {
                            transform: translateX(-8px);
                        }

                        50% {
                            transform: translateX(8px);
                        }

                        75% {
                            transform: translateX(-8px);
                        }

                        100% {
                            transform: translateX(0);
                        }
                    }
                `}</style>
            </div>

            <ToastContainer />
        </div>
    );
}

function Field({
    icon,
    placeholder,
    type,
    value,
    onChange,
}: {
    icon: ReactNode;
    placeholder: string;
    type: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-6 transition duration-300 focus-within:border-blue-500 focus-within:bg-white">
            <div className="text-slate-400 transition group-focus-within:text-blue-600">{icon}</div>
            <input
                type={type || 'text'}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent py-6 outline-none"
            />
        </div>
    );
}

function Stat({ value, label }: { value: string; label: string }) {
    return (
        <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
            <h3 className="text-3xl font-black">{value}</h3>

            <p className="mt-3 text-sm text-blue-100">{label}</p>
        </div>
    );
}
