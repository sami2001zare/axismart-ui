// src/app/categories/page.tsx

'use client';

import Navbar from '@/components/site/navbar';
import Footer from '@/components/site/footer';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowLeft } from 'lucide-react';

const categories = [
    {
        title: 'بلبرینگ',
        count: '248 محصول',
        image: '/products/bearing.jpg',
        subs: ['SKF', 'NSK', 'FAG', 'TIMKEN'],
    },
    {
        title: 'تسمه صنعتی',
        count: '136 محصول',
        image: '/products/belt.jpg',
        subs: ['BANDO', 'OPTIBELT', 'MITSUBOSHI'],
    },
    {
        title: 'پولی',
        count: '92 محصول',
        image: '/products/pulley.jpg',
        subs: ['آلومینیومی', 'چدنی', 'HTD'],
    },
    {
        title: 'زنجیر صنعتی',
        count: '74 محصول',
        image: '/products/chain.jpg',
        subs: ['Heavy Duty', 'Roller', 'ANSI'],
    },
];

export default function CategoriesPage() {
    return (
        <>
            <Navbar />

            <main className="bg-slate-50 pt-28 pb-24">
                <div className="mx-auto max-w-[1450px] px-8">
                    {/* HERO */}

                    <div className="mb-14">
                        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-medium text-blue-700">
                            دسته‌بندی محصولات
                        </span>

                        <h1 className="mt-8 text-5xl leading-tight font-black text-slate-900">
                            اکسپلورر دسته‌بندی صنعتی
                        </h1>

                        <p className="mt-5 max-w-[760px] text-[15px] leading-8 text-slate-600">
                            مرور تخصصی دسته‌بندی‌های صنعتی، برندها و محصولات همکاری.
                        </p>
                    </div>

                    {/* SEARCH */}

                    <div className="mb-10 rounded-[32px] border border-slate-200 bg-white p-6">
                        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                            <Search size={18} className="text-slate-400" />

                            <input
                                placeholder="جستجوی دسته‌بندی..."
                                className="w-full bg-transparent text-sm outline-none"
                            />
                        </div>
                    </div>

                    {/* GRID */}

                    <div className="grid gap-8 lg:grid-cols-2">
                        {categories.map((cat) => (
                            <Link
                                key={cat.title}
                                href="/products"
                                className="group overflow-hidden rounded-[34px] border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="grid lg:grid-cols-[280px_1fr]">
                                    {/* IMAGE */}

                                    <div className="relative h-[320px] overflow-hidden bg-slate-100">
                                        <Image
                                            src={cat.image}
                                            alt={cat.title}
                                            fill
                                            className="object-cover transition duration-700 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* CONTENT */}

                                    <div className="p-8">
                                        <div className="flex items-start justify-between gap-5">
                                            <div>
                                                <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-medium text-blue-700">
                                                    {cat.count}
                                                </div>

                                                <h2 className="mt-6 text-3xl font-black text-slate-900">
                                                    {cat.title}
                                                </h2>
                                            </div>

                                            <ArrowLeft
                                                size={24}
                                                className="text-slate-300 transition group-hover:-translate-x-2 group-hover:text-blue-600"
                                            />
                                        </div>

                                        <p className="mt-8 text-sm leading-8 text-slate-600">
                                            تامین تخصصی محصولات، قطعات صنعتی و خرید همکاری.
                                        </p>

                                        <div className="mt-10 flex flex-wrap gap-3">
                                            {cat.subs.map((item) => (
                                                <div
                                                    key={item}
                                                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600"
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>

                                        <button className="mt-10 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-medium text-white transition hover:bg-blue-600">
                                            مشاهده محصولات
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
