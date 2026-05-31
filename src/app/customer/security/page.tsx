// src/app/customer/security/page.tsx

"use client";

import {
    Shield,
    KeyRound,
    Smartphone,
    Save,
    CheckCircle2,
} from "lucide-react";

export default function SecurityPage() {

    return (

        <div className="space-y-8">

            <div>

                <h1 className=" text-4xl font-black text-slate-900 ">
                    امنیت حساب
                </h1>

                <p className=" mt-3 text-sm text-slate-500 ">
                    تنظیمات امنیتی و مدیریت دسترسی حساب.
                </p>

            </div>

            <div className=" grid gap-8 xl:grid-cols-[1fr_420px] ">

                <div className="space-y-8">

                    <div className=" rounded-[34px] border border-slate-200 bg-white p-8 ">

                        <div className=" flex items-center gap-4 ">

                            <div className=" flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ">

                                <KeyRound size={22} />

                            </div>

                            <div>

                                <h3 className=" text-xl font-black text-slate-900 ">
                                    تغییر رمز عبور
                                </h3>

                                <p className=" mt-2 text-sm text-slate-500 ">
                                    بروزرسانی رمز ورود حساب کاربری.
                                </p>

                            </div>

                        </div>

                        <div className=" mt-8 grid gap-6 ">

                            <Field
                                label="رمز فعلی"
                            />

                            <Field
                                label="رمز جدید"
                            />

                            <Field
                                label="تکرار رمز جدید"
                            />

                        </div>

                        <button className=" mt-8 inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-medium text-white ">
                            <Save size={16} />
                            ذخیره رمز جدید
                        </button>
                    </div>

                    <div className=" rounded-[34px] border border-slate-200 bg-white p-8 ">
                        <div className=" flex items-center justify-between ">
                            <div>
                                <h3 className=" text-xl font-black text-slate-900 ">
                                    احراز هویت دو مرحله‌ای
                                </h3>

                                <p className=" mt-2 text-sm text-slate-500 ">
                                    افزایش امنیت ورود به حساب.
                                </p>
                            </div>

                            <button className=" rounded-full bg-emerald-50 px-5 py-3 text-xs font-bold text-emerald-700 ">
                                فعال
                            </button>

                        </div>

                        <div className=" mt-8 rounded-3xl bg-slate-50 p-6 ">

                            <div className=" flex items-center gap-4 ">

                                <Smartphone
                                    size={22}
                                    className="text-blue-600"
                                />

                                <div>
                                    <p className=" font-bold text-slate-900 ">
                                        Google Authenticator
                                    </p>

                                    <p className=" mt-2 text-sm text-slate-500 ">
                                        آخرین استفاده: امروز
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className=" rounded-[34px] border border-slate-200 bg-gradient-to-br from-slate-900 to-blue-900 p-8 text-white ">

                        <div className=" flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 ">
                            <Shield size={28} />
                        </div>

                        <h3 className=" mt-8 text-2xl font-black ">
                            Security Score
                        </h3>

                        <p className=" mt-4 text-sm leading-8 text-slate-300 ">
                            حساب شما در وضعیت امنیتی مطلوب قرار دارد.
                        </p>

                        <div className=" mt-8 h-3 overflow-hidden rounded-full bg-white/10 ">
                            <div className=" h-full w-[82%] rounded-full bg-emerald-400 " />
                        </div>

                        <p className=" mt-4 text-3xl font-black ">
                            82%
                        </p>
                    </div>

                    <div className=" rounded-[34px] border border-slate-200 bg-white p-8 ">

                        <h3 className=" font-black text-slate-900 ">
                            فعالیت‌های اخیر
                        </h3>

                        <div className=" mt-8 space-y-5 ">

                            <Activity
                                title="ورود موفق"
                                time="امروز — تهران"
                            />

                            <Activity
                                title="تغییر رمز عبور"
                                time="۲ روز پیش"
                            />

                            <Activity
                                title="فعال‌سازی 2FA"
                                time="۱ هفته پیش"
                            />

                        </div>

                    </div>

                </div>

            </div>
        </div>

    );

}

function Field({
    label,
}: any) {

    return (
        <div>
            <label className=" mb-4 block text-sm font-bold text-slate-700 ">
                {label}
            </label>

            <input type="password" className=" w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none " />
        </div>
    );

}

function Activity({
    title,
    time,
}: any) {

    return (
        <div className=" flex items-start gap-4 rounded-2xl bg-slate-50 p-5 ">
            <div className=" mt-1 text-emerald-600 ">
                <CheckCircle2 size={16} />
            </div>

            <div>
                <p className=" font-bold text-slate-900 ">
                    {title}
                </p>

                <p className=" mt-2 text-sm text-slate-500 ">
                    {time}
                </p>
            </div>
        </div>
    );
}