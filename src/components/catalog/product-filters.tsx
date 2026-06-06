'use client';

import { useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

export default function ProductFilters() {
    const [opened, setOpened] = useState({
        category: true,
        brand: true,
        price: true,
        availability: true,
        sale: true,
    });

    return (
        <div className="sticky top-28 h-fit overflow-hidden rounded-[30px] border border-slate-200 bg-white">
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-100 px-7 py-6">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-slate-100" />
                    <h3 className="text-[15px] font-bold text-slate-900">فیلتر محصولات</h3>
                </div>

                <button className="text-sm font-medium text-blue-600">پاک کردن</button>
            </div>

            {/* ACTIVE FILTERS */}
            <div className="flex flex-wrap gap-3 px-7 py-5">
                <ActiveFilter>SKF</ActiveFilter>
                <ActiveFilter>بلبرینگ</ActiveFilter>
                <ActiveFilter>عمده</ActiveFilter>
            </div>

            {/* CATEGORY */}
            <Section
                title="دسته‌بندی"
                open={opened.category}
                toggle={() =>
                    setOpened({
                        ...opened,
                        category: !opened.category,
                    })
                }
            >
                <Checkbox label="بلبرینگ" count="248" />
                <Checkbox label="تسمه" count="136" />
                <Checkbox label="پولی" count="92" />
                <Checkbox label="زنجیر" count="74" />
            </Section>

            {/* BRAND */}
            <Section
                title="برند"
                open={opened.brand}
                toggle={() =>
                    setOpened({
                        ...opened,
                        brand: !opened.brand,
                    })
                }
            >
                <div className="mb-5 flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                    <Search size={16} className="text-slate-400" />

                    <input placeholder="جستجوی برند..." className="w-full text-sm outline-none" />
                </div>

                <Checkbox label="SKF" count="120" />
                <Checkbox label="NSK" count="96" />
                <Checkbox label="BANDO" count="84" />
                <Checkbox label="FAG" count="58" />
            </Section>

            {/* PRICE */}

            <Section
                title="بازه قیمت"
                open={opened.price}
                toggle={() =>
                    setOpened({
                        ...opened,
                        price: !opened.price,
                    })
                }
            >
                <input type="range" min="0" max="100" className="w-full accent-blue-600" />

                <div className="mt-5 flex justify-between text-sm text-slate-500">
                    <span>۵۰۰ هزار</span>

                    <span>۱۰ میلیون</span>
                </div>
            </Section>

            {/* STOCK */}

            <Section
                title="وضعیت موجودی"
                open={opened.availability}
                toggle={() =>
                    setOpened({
                        ...opened,
                        availability: !opened.availability,
                    })
                }
            >
                <ToggleRow>فقط کالاهای موجود</ToggleRow>
                <ToggleRow>ارسال فوری</ToggleRow>
            </Section>

            {/* SALES */}
            <Section
                title="نوع فروش"
                open={opened.sale}
                toggle={() =>
                    setOpened({
                        ...opened,
                        sale: !opened.sale,
                    })
                }
            >
                <div className="grid grid-cols-2 gap-3">
                    <SaleCard title="خرده" active={false} />
                    <SaleCard title="عمده" active />
                </div>
            </Section>
        </div>
    );
}

function Section({
    title,
    open,
    toggle,
    children,
}: {
    title: string;
    open: boolean;
    toggle: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="border-t border-slate-100 px-7 py-6">
            <button onClick={toggle} className="flex w-full items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">{title}</h4>

                <ChevronDown size={18} className={`transition ${open ? 'rotate-180' : ''} `} />
            </button>

            {open && <div className="mt-6 space-y-4">{children}</div>}
        </div>
    );
}

function Checkbox({ label, count }: { label: string; count: string }) {
    return (
        <label className="flex items-center justify-between rounded-2xl px-2 py-2 transition hover:bg-slate-50">
            <div className="flex items-center gap-3">
                <input type="checkbox" className="h-4 w-4 rounded accent-blue-600" />
                <span className="text-sm text-slate-700">{label}</span>
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
                {count}
            </span>
        </label>
    );
}

function ActiveFilter({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-medium text-blue-700">
            {children}
            <X size={12} />
        </div>
    );
}

function ToggleRow({ children }: { children: React.ReactNode }) {
    return (
        <label className="flex items-center justify-between">
            <span className="text-sm text-slate-700">{children}</span>
            <input type="checkbox" className="h-5 w-5 accent-blue-600" />
        </label>
    );
}

function SaleCard({ title, active }: { title: string; active: boolean }) {
    return (
        <button
            className={`rounded-2xl border px-5 py-4 text-sm font-medium transition ${active ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600'} `}
        >
            {title}
        </button>
    );
}
