// src/app/customer/quotes/page.tsx

'use client';

import {
    FileSpreadsheet,
    Plus,
    Search,
    ChevronRight,
    Clock3,
    CheckCircle2,
    XCircle,
} from 'lucide-react';
import { ReactNode } from 'react';

export default function QuotesPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-slate-900">درخواست‌های قیمت</h1>

                    <p className="mt-3 text-sm text-slate-500">
                        مدیریت RFQ و استعلام قیمت محصولات.
                    </p>
                </div>

                <button className="inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-medium text-white">
                    <Plus size={16} />
                    درخواست جدید
                </button>
            </div>

            <div className="rounded-[34px] border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                    <Search size={18} />

                    <input
                        placeholder="جستجوی درخواست..."
                        className="w-85 bg-transparent text-sm outline-none"
                    />
                </div>
            </div>

            <div className="space-y-5">
                <QuoteCard
                    id="RFQ-2041"
                    title="بلبرینگ SKF سری 6200"
                    status="approved"
                    date="امروز"
                />

                <QuoteCard id="RFQ-2018" title="تسمه صنعتی BANDO" status="pending" date="دیروز" />

                <QuoteCard
                    id="RFQ-1984"
                    title="زنجیر صنعتی Heavy Duty"
                    status="rejected"
                    date="۴ روز پیش"
                />
            </div>
        </div>
    );
}

function QuoteCard({
    id,
    title,
    status,
    date,
}: {
    id: string;
    title: string;
    status: string;
    date: string;
}) {
    const styles: {
        approved: string;
        pending: string;
        rejected: string;
    } = {
        approved: 'bg-emerald-50 text-emerald-700',
        pending: 'bg-amber-50 text-amber-700',
        rejected: 'bg-red-50 text-red-700',
    };

    const icons: {
        approved: ReactNode;
        pending: ReactNode;
        rejected: ReactNode;
    } = {
        approved: <CheckCircle2 size={13} />,
        pending: <Clock3 size={13} />,
        rejected: <XCircle size={13} />,
    };

    const labels: {
        approved: string;
        pending: string;
        rejected: string;
    } = {
        approved: 'تایید شد',
        pending: 'در انتظار',
        rejected: 'رد شد',
    };

    return (
        <div className="rounded-[34px] border border-slate-200 bg-white p-7 transition hover:border-blue-300">
            <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                        <FileSpreadsheet size={20} />
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
