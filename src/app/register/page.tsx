'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Phone, Lock, User2, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';

import { token } from '@/lib/auth/token';
import { useAuthStore } from '@/lib/axios/auth-store';
import { customerAuthService } from '@/lib/axios/customer-auth.service';
import { toast, ToastContainer } from 'react-toastify';

export default function CustomerRegisterPage() {
    const [step, setStep] = useState<'form' | 'otp'>('form');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(0);
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [verifyOTP] = useState({
        phone: '',
        otp: '',
    });

    const setUser = useAuthStore((s) => s.setUser);

    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    const strength = passwordStrength(form.password);

    function update(key: string, value: string) {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    }

    // function updateVerificationForm(
    //     key: string,
    //     value: any
    // ) {
    //     setVerifyOTP((prev) => ({
    //         ...prev,
    //         [key]: value,
    //     }));
    // }

    async function verifytRegistration() {
        setError('');
        if (!verifyOTP.phone || !verifyOTP.otp) {
            setError('تمام فیلدها الزامی هستند.');
            return;
        }

        try {
            setLoading(true);

            const data = await customerAuthService.verifyRegistration({
                phone: verifyOTP.phone,
                otp: verifyOTP.otp,
            });

            token.set(data.value);

            setUser(data.user);

            window.location.href = '/customer';
        } catch {
            setError('ثبت‌نام انجام نشد.');
        } finally {
            setLoading(false);
        }
    }

    async function registerNewCustomer() {
        setError('');
        if (!form.firstname || !form.lastname || !form.phone || !form.password) {
            setError('تمام فیلدها الزامی هستند.');
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError('رمز عبور و تکرار آن یکسان نیست.');
            return;
        }

        try {
            setLoading(true);

            const data = await customerAuthService.register({
                firstName: form.firstname,
                lastName: form.lastname,
                phone: form.phone,
                password: form.password,
            });

            if ((data.value as string).length > 30) {
                setStep('otp');
                toast.success('کد تایید به شماره شما ارسال شد');
            }
            // token.set(
            //     data.accessToken
            // );

            // setUser(data.user);

            // window.location.href =
            //     "/customer";
        } catch {
            setError('ثبت‌نام انجام نشد.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-white p-8">
            <div className="grid w-full max-w-330 overflow-hidden rounded-[42px] border border-slate-200 bg-white shadow-[0_35px_90px_rgba(15,23,42,0.08)] xl:grid-cols-[1fr_620px]">
                <div className="hidden flex-col justify-between bg-gradient-to-br from-blue-700 via-blue-600 to-slate-900 p-14 text-white xl:flex">
                    <div>
                        <h2 className="mt-10 text-6xl leading-[1.15] font-black">
                            شروع خرید هوشمند صنعتی
                        </h2>
                        <p className="mt-8 max-w-107.5 leading-9 text-blue-100">
                            ثبت‌نام سریع، دسترسی به سفارشات، استعلام قیمت و پنل مشتری.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <Stat value="10K+" label="کاربر فعال" />
                        <Stat value="500+" label="محصول" />
                        <Stat value="24/7" label="پشتیبانی" />
                        <Stat value="99%" label="رضایت" />
                    </div>
                </div>
                <div className="p-12 xl:p-14">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-5xl font-black text-slate-900">ثبت‌نام مشتری</h1>
                            <p className="mt-4 text-sm text-slate-500">
                                ایجاد حساب شخصی جدید
                                {step}
                            </p>
                        </div>
                        <div className="rounded-full bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700">
                            {step === 'form' ? 'ثبت اطلاعات' : 'تایید پیامکی'}
                        </div>
                    </div>

                    {error && (
                        <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm leading-8 text-red-700">
                            {error}
                        </div>
                    )}

                    {step === 'form' && (
                        <div className="mt-10 space-y-4">
                            <div className="flex flex-col gap-4 md:flex-row">
                                <Field
                                    type="text"
                                    icon={<User2 size={18} />}
                                    placeholder="نام"
                                    value={form.firstname}
                                    onChange={(v) => update('firstname', v)}
                                />
                                <Field
                                    type="text"
                                    icon={<User2 size={18} />}
                                    placeholder="نام خانوادگی"
                                    value={form.lastname}
                                    onChange={(v) => update('lastname', v)}
                                />
                            </div>

                            <Field
                                type="text"
                                icon={<Phone size={18} />}
                                placeholder="شماره موبایل"
                                value={form.phone}
                                onChange={(v) => {
                                    update('phone', v);
                                }}
                            />

                            <Field
                                icon={<Lock size={18} />}
                                type="password"
                                placeholder="رمز عبور"
                                value={form.password}
                                onChange={(v) => update('password', v)}
                            />

                            <Field
                                icon={<Lock size={18} />}
                                type="password"
                                placeholder="تکرار رمز عبور"
                                value={form.confirmPassword}
                                onChange={(v) => update('confirmPassword', v)}
                            />

                            <div>
                                <div className="flex items-center justify-between text-sm">
                                    <span>قدرت رمز</span>

                                    <span>{strength.label}</span>
                                </div>

                                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className={`h-full transition-all duration-500 ${strength.color} `}
                                        style={{ width: strength.width }}
                                    />
                                </div>
                            </div>
                            {/* <label className=" flex cursor-pointer items-center gap-4 rounded-2xl bg-slate-50 p-5 ">
                                <input
                                    type="checkbox"
                                    checked={form.agree}
                                    onChange={(e) =>
                                        update(
                                            "agree",
                                            e.target.checked
                                        )
                                    }
                                />

                                <span className=" text-sm text-slate-600 ">
                                    قوانین و شرایط
                                    استفاده را می‌پذیرم.
                                </span>
                            </label> */}

                            <button
                                onClick={registerNewCustomer}
                                disabled={loading}
                                className="group flex w-full items-center justify-center gap-3 rounded-3xl bg-blue-600 py-5 font-black text-white transition hover:scale-[1.02]"
                            >
                                {loading ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : (
                                    <>
                                        ثبت نام
                                        <ArrowLeft
                                            size={18}
                                            className="transition group-hover:-translate-x-1"
                                        />
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {step === 'otp' && (
                        <div className="mt-10 space-y-6">
                            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
                                <div className="flex items-center gap-4">
                                    <CheckCircle2 size={22} className="text-blue-600" />
                                    <p className="text-sm leading-8 text-slate-700">
                                        کد تایید به {form.phone} ارسال شد.
                                    </p>
                                </div>
                            </div>

                            {/* <Field
                                icon={<KeyRound size={18} />}
                                placeholder="کد تایید پیامکی"
                                value={verifyOTP.otp}
                                onChange={(v) =>
                                    updateVerificationForm(
                                        "otp",
                                        v
                                    )
                                }
                            /> */}

                            <div className="grid gap-4 md:grid-cols-2">
                                {/* <button disabled={countdown > 0} onClick={() => toast.info('Resend OTP')} className=" rounded-2xl border border-slate-200 py-4 font-bold " >
                                    {
                                        countdown > 0
                                            ?
                                            `${countdown}s`
                                            :
                                            "ارسال مجدد"
                                    }
                                </button> */}

                                {/* Validate Register Via OTP */}
                                <button
                                    onClick={verifytRegistration}
                                    disabled={loading}
                                    className="rounded-2xl bg-blue-600 py-4 font-black text-white"
                                >
                                    {loading ? 'درحال ثبت...' : 'تکمیل ثبت‌نام'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
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
        <div className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 px-6 transition focus-within:border-blue-500 focus-within:bg-white">
            <div className="text-slate-400 group-focus-within:text-blue-600">{icon}</div>

            <input
                type={type || 'text'}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent py-4 outline-none"
            />
        </div>
    );
}

function Stat({ value, label }: { value: string; label: string }) {
    return (
        <div className="rounded-3xl bg-white/10 p-6">
            <h3 className="text-3xl font-black">{value}</h3>
            <p className="mt-3 text-sm text-blue-100">{label}</p>
        </div>
    );
}

function passwordStrength(password: string) {
    if (password.length < 5) {
        return {
            label: 'ضعیف',
            width: '25%',
            color: 'bg-red-500',
        };
    }

    if (password.length < 8) {
        return {
            label: 'متوسط',
            width: '60%',
            color: 'bg-amber-500',
        };
    }

    return {
        label: 'قوی',
        width: '100%',
        color: 'bg-emerald-500',
    };
}
