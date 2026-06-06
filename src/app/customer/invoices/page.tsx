// src/app/customer/invoices/page.tsx

'use client';

import { Search, Download, BadgeCheck, Clock3, Filter, FileText, Eye } from 'lucide-react';
import { ReactNode } from 'react';

const invoices = [
    {
        id: 'INV-2041',
        date: '2026/05/31',
        amount: '۸,۲۰۰,۰۰۰',
        status: 'paid',
    },

    {
        id: 'INV-2019',
        date: '2026/05/22',
        amount: '۲,۴۰۰,۰۰۰',
        status: 'pending',
    },

    {
        id: 'INV-1984',
        date: '2026/05/11',
        amount: '۱۲,۱۰۰,۰۰۰',
        status: 'paid',
    },
];

export default function InvoicesPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-slate-900">فاکتورها</h1>

                    <p className="mt-3 text-sm text-slate-500">
                        مدیریت، مشاهده و دانلود فاکتورهای مالی.
                    </p>
                </div>

                <button className="inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-medium text-white">
                    <Download size={16} />
                    خروجی اکسل
                </button>
            </div>

            <div className="grid gap-6 xl:grid-cols-4">
                <Mini title="کل فاکتورها" value="64" />
                <Mini title="پرداخت شده" value="52" />
                <Mini title="در انتظار" value="12" />
                <Mini title="جمع کل" value="۲۴۸M" />
            </div>

            <div className="rounded-[34px] border border-slate-200 bg-white p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                        <Search size={18} />

                        <input
                            placeholder="جستجوی فاکتور..."
                            className="w-[320px] bg-transparent text-sm outline-none"
                        />
                    </div>

                    <button className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 px-5 py-4 text-sm font-medium">
                        <Filter size={16} />
                        فیلتر پیشرفته
                    </button>
                </div>
            </div>

            <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white">
                <table className="w-full">
                    <thead className="bg-slate-50 text-right">
                        <tr>
                            <TH>فاکتور</TH>
                            <TH>تاریخ</TH>
                            <TH>مبلغ</TH>
                            <TH>وضعیت</TH>
                            <TH>عملیات</TH>
                        </tr>
                    </thead>

                    <tbody>
                        {invoices.map((item) => (
                            <Row key={item.id} {...item} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Row({
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
    const styles: {
        paid: string;
        pending: string;
    } = {
        paid: 'bg-emerald-50 text-emerald-700',
        pending: 'bg-amber-50 text-amber-700',
    };

    const labels: {
        paid: string;
        pending: string;
    } = {
        paid: 'پرداخت شده',
        pending: 'در انتظار',
    };

    const icons: {
        paid: ReactNode;
        pending: ReactNode;
    } = {
        paid: <BadgeCheck size={13} />,
        pending: <Clock3 size={13} />,
    };

    return (
        <tr className="border-t border-slate-100 hover:bg-slate-50">
            <td className="px-8 py-6 font-bold text-slate-900">
                <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                        <FileText size={16} />
                    </div>

                    {id}
                </div>
            </td>

            <td className="px-8 py-6">{date}</td>

            <td className="px-8 py-6 font-bold text-slate-900">{amount}</td>

            <td className="px-8 py-6">
                <div
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium ${styles[status as keyof typeof styles]}`}
                >
                    {icons[status as keyof typeof icons]}
                    {labels[status as keyof typeof labels]}
                </div>
            </td>

            <td className="px-8 py-6">
                <div className="flex gap-3">
                    <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200">
                        <Eye size={15} />
                    </button>

                    <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200">
                        <Download size={15} />
                    </button>
                </div>
            </td>
        </tr>
    );
}

function TH({ children }: { children: ReactNode }) {
    return <th className="px-8 py-5 text-sm font-bold text-slate-700">{children}</th>;
}

function Mini({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-[34px] border border-slate-200 bg-white p-7">
            <p className="text-sm text-slate-500">{title}</p>

            <h3 className="mt-4 text-3xl font-black text-slate-900">{value}</h3>
        </div>
    );
}
