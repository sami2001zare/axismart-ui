// src/app/customer/quotes/new/page.tsx

'use client';

import { ArrowRight, Plus, Trash2, Send } from 'lucide-react';

export default function NewQuotePage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-5">
                <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                    <ArrowRight size={18} />
                </button>

                <div>
                    <h1 className="text-4xl font-black text-slate-900">درخواست قیمت جدید</h1>

                    <p className="mt-3 text-sm text-slate-500">ثبت استعلام قیمت عمده و سفارشی.</p>
                </div>
            </div>

            <div className="rounded-[34px] border border-slate-200 bg-white p-8">
                <div className="space-y-6">
                    <ProductRow />

                    <ProductRow />

                    <button className="inline-flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 px-5 py-4 text-sm font-medium">
                        <Plus size={16} />
                        افزودن محصول
                    </button>
                </div>

                <div className="mt-10">
                    <label className="mb-4 block text-sm font-bold text-slate-700">
                        توضیحات درخواست
                    </label>

                    <textarea
                        rows={7}
                        className="w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 p-6 outline-none"
                    />
                </div>

                <button className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 text-sm font-medium text-white">
                    <Send size={16} />
                    ارسال درخواست
                </button>
            </div>
        </div>
    );
}

function ProductRow() {
    return (
        <div className="grid gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-6 lg:grid-cols-[1.5fr_160px_160px_60px]">
            <input
                placeholder="نام محصول"
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none"
            />

            <input
                placeholder="تعداد"
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none"
            />

            <input
                placeholder="برند / مدل"
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none"
            />

            <button className="flex h-[56px] items-center justify-center rounded-2xl border border-red-200 bg-white text-red-600">
                <Trash2 size={16} />
            </button>
        </div>
    );
}
