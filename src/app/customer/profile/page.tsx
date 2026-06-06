// src/app/customer/profile/page.tsx

'use client';

import { Save } from 'lucide-react';

export default function ProfilePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-black text-slate-900">پروفایل</h1>

                <p className="mt-3 text-sm text-slate-500">مدیریت اطلاعات حساب کاربری.</p>
            </div>

            <div className="grid gap-8 xl:grid-cols-[380px_1fr]">
                <div className="rounded-[34px] border border-slate-200 bg-white p-8 text-center">
                    <div className="mx-auto h-32 w-32 rounded-full bg-blue-600" />

                    <h3 className="mt-8 text-2xl font-black text-slate-900">سامان زارع</h3>

                    <p className="mt-3 text-sm text-slate-500">Wholesale Customer</p>
                </div>

                <div className="rounded-[34px] border border-slate-200 bg-white p-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Field label="نام" placeholder="سامان" />

                        <Field label="نام خانوادگی" placeholder="زارع" />

                        <Field label="ایمیل" placeholder="saman@mail.com" />

                        <Field label="شماره تماس" placeholder="0912..." />
                    </div>

                    <div className="mt-8">
                        <label className="mb-4 block text-sm font-bold text-slate-700">
                            درباره من
                        </label>

                        <textarea
                            rows={6}
                            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 outline-none"
                        />
                    </div>

                    <button className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-medium text-white">
                        <Save size={16} />
                        ذخیره تغییرات
                    </button>
                </div>
            </div>
        </div>
    );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
    return (
        <div>
            <label className="mb-4 block text-sm font-bold text-slate-700">{label}</label>

            <input
                placeholder={placeholder}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none"
            />
        </div>
    );
}
