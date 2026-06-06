// src/app/admin/customers/[id]/page.tsx

'use client';

import {
    ArrowRight,
    Mail,
    Phone,
    MapPin,
    ShoppingCart,
    DollarSign,
    Clock3,
    Building2,
    MoreHorizontal,
} from 'lucide-react';
import { ReactNode } from 'react';

export default function CustomerDetailsPage() {
    return (
        <div className="space-y-8">
            {/* HEADER */}

            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-center gap-5">
                    <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                        <ArrowRight size={18} />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900">پارس صنعت</h1>
                        <p className="mt-3 text-sm text-slate-500">CUS-2041 · Customer Profile</p>
                    </div>
                </div>
                <button className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-medium">
                    <MoreHorizontal size={16} />
                    عملیات
                </button>
            </div>
            <div className="grid gap-8 xl:grid-cols-[1.4fr_420px]">
                {/* LEFT */}
                <div className="space-y-8">
                    {/* STATS */}
                    <div className="grid gap-6 lg:grid-cols-3">
                        <StatCard title="سفارشات" value="18" icon={<ShoppingCart size={18} />} />
                        <StatCard title="خرید کل" value="۸۲M" icon={<DollarSign size={18} />} />
                        <StatCard title="عضویت" value="2 سال" icon={<Clock3 size={18} />} />
                    </div>
                    {/* ORDERS */}

                    <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white">
                        <div className="border-b border-slate-100 px-8 py-6">
                            <h3 className="text-lg font-bold text-slate-900">سفارشات مشتری</h3>
                        </div>
                        <table className="w-full">
                            <thead className="bg-slate-50 text-right">
                                <tr>
                                    <TH>سفارش</TH>
                                    <TH>تاریخ</TH>
                                    <TH>مبلغ</TH>
                                    <TH>وضعیت</TH>
                                </tr>
                            </thead>
                            <tbody>
                                <OrderRow
                                    id="#AX2041"
                                    date="2026/05/31"
                                    amount="۸,۲۰۰,۰۰۰"
                                    status="پرداخت شده"
                                />
                                <OrderRow
                                    id="#AX2018"
                                    date="2026/05/26"
                                    amount="۳,۱۰۰,۰۰۰"
                                    status="ارسال شد"
                                />
                                <OrderRow
                                    id="#AX1984"
                                    date="2026/05/18"
                                    amount="۱۲,۴۰۰,۰۰۰"
                                    status="پرداخت شده"
                                />
                            </tbody>
                        </table>
                    </div>
                    {/* NOTES */}

                    <div className="rounded-[34px] border border-slate-200 bg-white p-8">
                        <h3 className="text-lg font-bold text-slate-900">یادداشت داخلی</h3>
                        <textarea
                            rows={7}
                            placeholder="یادداشت تیم فروش..."
                            className="mt-8 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm outline-none"
                        />
                        <button className="mt-6 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-medium text-white">
                            ذخیره یادداشت
                        </button>
                    </div>
                </div>
                {/* RIGHT */}

                <div className="space-y-8">
                    {/* PROFILE */}

                    <div className="rounded-[34px] border border-slate-200 bg-white p-7">
                        <div className="flex items-center gap-5">
                            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-blue-700">
                                <Building2 size={26} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">پارس صنعت</h3>
                                <p className="mt-2 text-xs text-slate-500">VIP Customer</p>
                            </div>
                        </div>
                        <div className="mt-8 space-y-5">
                            <Row icon={<Mail size={15} />} value="info@pars.com" />
                            <Row icon={<Phone size={15} />} value="09121234567" />
                            <Row icon={<MapPin size={15} />} value="تهران، خیابان آزادی" />
                        </div>
                    </div>
                    {/* ACCOUNT */}

                    <div className="rounded-[34px] border border-slate-200 bg-white p-7">
                        <h3 className="font-bold text-slate-900">حساب مشتری</h3>
                        <div className="mt-8 space-y-4">
                            <AccountRow label="نوع حساب" value="Wholesale" />
                            <AccountRow label="اعتبار" value="۵۰,۰۰۰,۰۰۰" />
                            <AccountRow label="وضعیت" value="Active" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: ReactNode }) {
    return (
        <div className="rounded-[34px]border border-slate-200bg-whitep-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                {icon}
            </div>
            <p className="mt-8 text-sm text-slate-500">{title}</p>
            <h3 className="mt-3 text-3xl font-black text-slate-900">{value}</h3>
        </div>
    );
}

function TH({ children }: { children: ReactNode }) {
    return <th className="px-8 py-5 text-sm font-bold text-slate-700">{children}</th>;
}

function OrderRow({
    id,
    date,
    amount,
    status,
}: {
    id: string;
    date: string;
    amount: string;
    status: string;
}) {
    return (
        <tr className="border-t border-slate-100">
            <td className="px-8 py-6 font-bold">{id}</td>
            <td className="px-8 py-6">{date}</td>
            <td className="px-8 py-6">{amount}</td>
            <td className="px-8 py-6">
                <div className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700">
                    {status}
                </div>
            </td>
        </tr>
    );
}

function Row({ icon, value }: { icon: ReactNode; value: string }) {
    return (
        <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            {icon}
            {value}
        </div>
    );
}

function AccountRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="font-bold text-slate-900">{value}</p>
        </div>
    );
}
