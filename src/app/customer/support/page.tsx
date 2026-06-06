// src/app/customer/support/page.tsx

'use client';

import {
    MessageSquare,
    Plus,
    Search,
    Clock3,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
} from 'lucide-react';
import { ReactNode } from 'react';

export default function SupportPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-slate-900">پشتیبانی</h1>

                    <p className="mt-3 text-sm text-slate-500">
                        تیکت‌ها، درخواست‌ها و ارتباط با تیم AxisMart.
                    </p>
                </div>

                <button className="inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-medium text-white">
                    <Plus size={16} />
                    تیکت جدید
                </button>
            </div>

            <div className="rounded-[34px] border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                    <Search size={18} />

                    <input
                        placeholder="جستجوی تیکت..."
                        className="w-[340px] bg-transparent text-sm outline-none"
                    />
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
                <MiniCard title="کل تیکت‌ها" value="18" />

                <MiniCard title="باز" value="4" />

                <MiniCard title="بسته شده" value="14" />
            </div>

            <div className="space-y-5">
                <TicketCard
                    title="مشکل در ثبت سفارش عمده"
                    id="SUP-2041"
                    status="open"
                    date="امروز"
                />

                <TicketCard
                    title="درخواست فاکتور رسمی"
                    id="SUP-2018"
                    status="closed"
                    date="دیروز"
                />

                <TicketCard
                    title="پیگیری ارسال سفارش"
                    id="SUP-1984"
                    status="pending"
                    date="۳ روز پیش"
                />
            </div>
        </div>
    );
}

function MiniCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-[34px] border border-slate-200 bg-white p-7">
            <p className="text-sm text-slate-500">{title}</p>

            <h3 className="mt-4 text-3xl font-black text-slate-900">{value}</h3>
        </div>
    );
}

function TicketCard({
    title,
    id,
    status,
    date,
}: {
    title: string;
    id: string;
    status: string;
    date: string;
}) {
    const styles: { open: string; closed: string; pending: string } = {
        open: 'bg-blue-50 text-blue-700',

        closed: 'bg-emerald-50 text-emerald-700',

        pending: 'bg-amber-50 text-amber-700',
    };

    const labels: { open: string; closed: string; pending: string } = {
        open: 'باز',
        closed: 'بسته',
        pending: 'در انتظار',
    };

    const icons: {
        open: ReactNode;
        closed: ReactNode;
        pending: ReactNode;
    } = {
        open: <AlertCircle size={13} />,
        closed: <CheckCircle2 size={13} />,
        pending: <Clock3 size={13} />,
    };

    return (
        <div className="rounded-[34px] border border-slate-200 bg-white p-7 transition hover:border-blue-300">
            <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                        <MessageSquare size={20} />
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-4">
                            <h3 className="font-black text-slate-900">{title}</h3>

                            <div
                                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium ${styles[status as keyof typeof styles]} `}
                            >
                                {icons[status as keyof typeof icons]}

                                {labels[status as keyof typeof labels]}
                            </div>
                        </div>

                        <p className="mt-4 text-sm text-slate-500">
                            {id} • {date}
                        </p>
                    </div>
                </div>

                <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200">
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}
