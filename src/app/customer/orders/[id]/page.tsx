// src/app/customer/orders/[id]/page.tsx

'use client';

import { ArrowRight, Printer, Download, Truck, MapPin } from 'lucide-react';
import { ReactNode } from 'react';

export default function CustomerOrderDetailsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-center gap-5">
                    <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                        <ArrowRight size={18} />
                    </button>

                    <div>
                        <h1 className="text-4xl font-black text-slate-900">سفارش #AX2041</h1>

                        <p className="mt-3 text-sm text-slate-500">ثبت شده در 2026/05/31</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 px-6 py-4 text-sm font-medium">
                        <Printer size={16} />
                        پرینت
                    </button>

                    <button className="inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-medium text-white">
                        <Download size={16} />
                        فاکتور
                    </button>
                </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.4fr_420px]">
                <div className="space-y-8">
                    <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white">
                        <div className="border-b border-slate-100 px-8 py-6">
                            <h3 className="text-lg font-bold text-slate-900">محصولات سفارش</h3>
                        </div>

                        <table className="w-full">
                            <thead className="bg-slate-50 text-right">
                                <tr>
                                    <TH>محصول</TH>
                                    <TH>تعداد</TH>
                                    <TH>قیمت</TH>
                                    <TH>جمع</TH>
                                </tr>
                            </thead>

                            <tbody>
                                <Row
                                    name="بلبرینگ SKF 6205"
                                    qty="5"
                                    price="۲,۴۵۰,۰۰۰"
                                    total="۱۲,۲۵۰,۰۰۰"
                                />

                                <Row name="پولی HTD" qty="2" price="۱,۱۵۰,۰۰۰" total="۲,۳۰۰,۰۰۰" />
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-8">
                    <Card>
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-slate-900">وضعیت سفارش</h3>

                            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-medium text-blue-700">
                                <Truck size={13} />
                                ارسال شد
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            <Info label="Tracking" value="TRK-982341" />

                            <Info label="Carrier" value="Tipax" />

                            <Info label="ETA" value="2 Days" />
                        </div>
                    </Card>

                    <Card>
                        <h3 className="font-bold text-slate-900">آدرس ارسال</h3>

                        <div className="mt-7 flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                                <MapPin size={18} />
                            </div>

                            <p className="text-sm leading-8 text-slate-600">
                                تهران، خیابان آزادی، کوچه ۱۲، پلاک ۸
                            </p>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="font-bold text-slate-900">خلاصه مالی</h3>

                        <div className="mt-8 space-y-5">
                            <Money label="Subtotal" value="۱۴,۵۵۰,۰۰۰" bold />

                            <Money label="Shipping" value="۳۰۰,۰۰۰" bold />

                            <Money label="Tax" value="۹۰۰,۰۰۰" bold />

                            <div className="border-t border-slate-100 pt-5">
                                <Money label="Total" value="۱۵,۷۵۰,۰۰۰" bold />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function Card({ children }: { children: ReactNode }) {
    return <div className="rounded-[34px] border border-slate-200 bg-white p-7">{children}</div>;
}

function TH({ children }: { children: ReactNode }) {
    return <th className="px-8 py-5 text-sm font-bold text-slate-700">{children}</th>;
}

function Row({
    name,
    qty,
    price,
    total,
}: {
    name: string;
    qty: string;
    price: string;
    total: string;
}) {
    return (
        <tr className="border-t border-slate-100">
            <td className="px-8 py-6 font-bold">{name}</td>
            <td className="px-8 py-6">{qty}</td>
            <td className="px-8 py-6">{price}</td>
            <td className="px-8 py-6 font-bold">{total}</td>
        </tr>
    );
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="font-bold text-slate-900">{value}</p>
        </div>
    );
}

function Money({ label, value, bold }: { label: string; value: string; bold: boolean }) {
    return (
        <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">{label}</p>

            <p className={` ${bold ? 'text-xl font-black' : 'font-bold'} text-slate-900`}>
                {value}
            </p>
        </div>
    );
}
