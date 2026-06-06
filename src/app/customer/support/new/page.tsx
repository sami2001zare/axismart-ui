// src/app/customer/support/new/page.tsx

'use client';

import {
    ArrowRight,
    Send,
    Paperclip,
    MessageSquare,
    AlertTriangle,
    ChevronDown,
} from 'lucide-react';

export default function NewTicketPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-5">
                <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                    <ArrowRight size={18} />
                </button>

                <div>
                    <h1 className="text-4xl font-black text-slate-900">ایجاد تیکت جدید</h1>

                    <p className="mt-3 text-sm text-slate-500">
                        ارسال درخواست به تیم پشتیبانی AxisMart.
                    </p>
                </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.5fr_380px]">
                <div className="rounded-[34px] border border-slate-200 bg-white p-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Field label="عنوان تیکت" placeholder="مشکل در ثبت سفارش" />

                        <Select label="دپارتمان" />

                        <Select label="اولویت" />

                        <Field label="شماره سفارش" placeholder="#AX2041" />
                    </div>

                    <div className="mt-8">
                        <label className="mb-4 block text-sm font-bold text-slate-700">
                            توضیحات
                        </label>

                        <textarea
                            rows={10}
                            placeholder="جزئیات درخواست خود را وارد کنید..."
                            className="w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm outline-none"
                        />
                    </div>

                    <div className="mt-8 flex items-center justify-between gap-5">
                        <button className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 px-5 py-4 text-sm font-medium">
                            <Paperclip size={16} />
                            ضمیمه فایل
                        </button>

                        <button className="inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 text-sm font-medium text-white">
                            <Send size={16} />
                            ثبت تیکت
                        </button>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="rounded-[34px] bg-gradient-to-br from-blue-600 to-slate-900 p-8 text-white">
                        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10">
                            <MessageSquare size={28} />
                        </div>

                        <h3 className="mt-8 text-2xl font-black">راهنمای ارسال تیکت</h3>

                        <ul className="mt-6 space-y-4 text-sm leading-8 text-blue-100">
                            <li>• عنوان دقیق انتخاب کنید.</li>

                            <li>• اطلاعات سفارش را وارد نمایید.</li>

                            <li>• تصویر خطا یا فایل مرتبط ضمیمه کنید.</li>
                        </ul>
                    </div>

                    <div className="rounded-[34px] border border-amber-200 bg-amber-50 p-7">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                                <AlertTriangle size={20} />
                            </div>

                            <div>
                                <h4 className="font-black text-slate-900">زمان پاسخگویی</h4>

                                <p className="mt-4 text-sm leading-8 text-slate-600">
                                    میانگین پاسخگویی تیم پشتیبانی بین ۱ تا ۶ ساعت کاری.
                                </p>
                            </div>
                        </div>
                    </div>
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

function Select({ label }: { label: string }) {
    return (
        <div>
            <label className="mb-4 block text-sm font-bold text-slate-700">{label}</label>

            <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-500">
                انتخاب کنید
                <ChevronDown size={16} />
            </button>
        </div>
    );
}
