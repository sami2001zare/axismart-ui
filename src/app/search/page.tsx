// src/app/search/page.tsx

'use client';

import Navbar from '@/components/site/navbar';
import Footer from '@/components/site/footer';
import Image from 'next/image';
import { Search, LayoutGrid, List, Filter } from 'lucide-react';

const results = [
    {
        title: 'بلبرینگ SKF 6205',
        brand: 'SKF',
        price: '۲,۴۵۰,۰۰۰',
        image: '/products/bearing.jpg',
    },

    {
        title: 'بلبرینگ NSK 6205',
        brand: 'NSK',
        price: '۲,۹۰۰,۰۰۰',
        image: '/products/bearing.jpg',
    },

    {
        title: 'بلبرینگ FAG 6205',
        brand: 'FAG',
        price: '۲,۷۰۰,۰۰۰',
        image: '/products/bearing.jpg',
    },
];

export default function SearchPage() {
    return (
        <>
            <Navbar />

            <main className="bg-slate-50 pt-28 pb-24">
                <div className="mx-auto max-w-[1450px] px-8">
                    {/* SEARCH HERO */}

                    <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white p-8">
                        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                            <div className="flex-1">
                                <h1 className="text-4xl font-black text-slate-900">نتایج جستجو</h1>

                                <p className="mt-4 text-sm leading-8 text-slate-600">
                                    ۳۲ نتیجه برای:
                                    <span className="mr-2 font-bold text-blue-700">SKF 6205</span>
                                </p>
                            </div>

                            <div className="flex flex-1 items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                                <Search size={18} className="text-slate-400" />

                                <input
                                    defaultValue="SKF 6205"
                                    className="w-full bg-transparent text-sm outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* TOOLBAR */}

                    <div className="mt-8 flex flex-col gap-5 rounded-4xl border border-slate-200 bg-white p-6 xl:flex-row xl:items-center xl:justify-between">
                        <div className="flex flex-wrap gap-4">
                            <button className="flex items-center gap-3 rounded-2xl border border-slate-200 px-5 py-4 text-sm">
                                <Filter size={16} />
                                فیلترها
                            </button>

                            <select className="rounded-2xl border border-slate-200 px-5 py-4 text-sm outline-none">
                                <option>جدیدترین</option>

                                <option>ارزان‌ترین</option>
                            </select>
                        </div>

                        <div className="flex overflow-hidden rounded-2xl border border-slate-200">
                            <button className="flex size-13 items-center justify-center bg-blue-50 text-blue-700">
                                <LayoutGrid size={18} />
                            </button>

                            <button className="flex size-13 items-center justify-center text-slate-500">
                                <List size={18} />
                            </button>
                        </div>
                    </div>

                    {/* RESULTS */}

                    <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {results.map((item) => (
                            <article
                                key={item.title}
                                className="overflow-hidden rounded-4xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="relative h-70 bg-slate-100">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition duration-700 hover:scale-105"
                                    />
                                </div>

                                <div className="p-6">
                                    <div className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-600">
                                        {item.brand}
                                    </div>

                                    <h2 className="mt-5 text-xl leading-8 font-bold text-slate-900">
                                        {item.title}
                                    </h2>

                                    <div className="mt-8 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-slate-400">قیمت</p>

                                            <h4 className="mt-2 text-2xl font-black text-slate-900">
                                                {item.price}
                                            </h4>
                                        </div>

                                        <div className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700">
                                            موجود
                                        </div>
                                    </div>

                                    <button className="mt-8 w-full rounded-2xl bg-slate-900 py-4 text-sm font-medium text-white transition hover:bg-blue-600">
                                        مشاهده محصول
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
