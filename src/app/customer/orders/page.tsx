// src/app/customer/orders/page.tsx

'use client';

import {
    Search,
    Filter,
    ChevronDown,
    Eye,
    Download,
    Truck,
    Clock3,
    CheckCircle2,
} from 'lucide-react';
import { ReactNode } from 'react';

const orders = [
    {
        id: '#AX2041',
        date: '2026/05/31',
        amount: '۸,۲۰۰,۰۰۰',
        items: 5,
        status: 'shipped',
    },

    {
        id: '#AX2019',
        date: '2026/05/24',
        amount: '۲,۴۰۰,۰۰۰',
        items: 2,
        status: 'paid',
    },

    {
        id: '#AX1982',
        date: '2026/05/18',
        amount: '۱۱,۳۰۰,۰۰۰',
        items: 8,
        status: 'pending',
    },
];

export default function CustomerOrdersPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-slate-900">سفارشات من</h1>

                    <p className="mt-3 text-sm text-slate-500">مدیریت و پیگیری سفارشات مشتری.</p>
                </div>

                <button className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-medium">
                    <Download size={16} />
                    خروجی سفارشات
                </button>
            </div>

            <div className="rounded-[34px] border border-slate-200 bg-white p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                        <Search size={18} className="text-slate-400" />

                        <input
                            placeholder="جستجوی سفارش..."
                            className="w-[340px] bg-transparent text-sm outline-none"
                        />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Select>همه وضعیت‌ها</Select>

                        <Select>بازه زمانی</Select>

                        <button className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 px-5 py-4 text-sm font-medium">
                            <Filter size={16} />
                            فیلتر
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
                <MiniStat title="کل سفارشات" value="18" />

                <MiniStat title="در حال ارسال" value="4" />

                <MiniStat title="پرداخت شده" value="12" />
            </div>

            <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white">
                <table className="w-full">
                    <thead className="bg-slate-50 text-right">
                        <tr>
                            <TH>سفارش</TH>
                            <TH>تاریخ</TH>
                            <TH>آیتم</TH>
                            <TH>مبلغ</TH>
                            <TH>وضعیت</TH>
                            <TH>عملیات</TH>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((item) => (
                            <tr
                                key={item.id}
                                className="border-t border-slate-100 hover:bg-slate-50"
                            >
                                <TD className="font-bold">{item.id}</TD>
                                <TD className="">{item.date}</TD>
                                <TD className="">{item.items}</TD>
                                <TD className="font-bold">{item.amount}</TD>
                                <TD className="">
                                    <StatusBadge status={item.status} />
                                </TD>
                                <TD className="">
                                    <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200">
                                        <Eye size={16} />
                                    </button>
                                </TD>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Select({ children }: { children: ReactNode }) {
    return (
        <button className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 px-5 py-4 text-sm font-medium">
            {children}

            <ChevronDown size={16} />
        </button>
    );
}

function TH({ children }: { children: ReactNode }) {
    return <th className="px-8 py-5 text-sm font-bold text-slate-700">{children}</th>;
}

function TD({ children, className }: { children: ReactNode; className: string }) {
    return <td className={`px-8 py-6 text-sm text-slate-700 ${className || ''} `}>{children}</td>;
}

function MiniStat({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-[34px] border border-slate-200 bg-white p-7">
            <p className="text-sm text-slate-500">{title}</p>

            <h3 className="mt-4 text-3xl font-black text-slate-900">{value}</h3>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: {
        shipped: string;
        paid: string;
        pending: string;
    } = {
        shipped: 'bg-blue-50 text-blue-700',
        paid: 'bg-emerald-50 text-emerald-700',
        pending: 'bg-amber-50 text-amber-700',
    };

    const labels: {
        shipped: string;
        paid: string;
        pending: string;
    } = {
        shipped: 'ارسال شد',
        paid: 'پرداخت شده',
        pending: 'در انتظار',
    };

    const icons: {
        shipped: ReactNode;
        paid: ReactNode;
        pending: ReactNode;
    } = {
        shipped: <Truck size={13} />,
        paid: <CheckCircle2 size={13} />,
        pending: <Clock3 size={13} />,
    };

    return (
        <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium ${styles[status as keyof typeof styles]} `}
        >
            {icons[status as keyof typeof icons]}
            {labels[status as keyof typeof labels]}
        </div>
    );
}
