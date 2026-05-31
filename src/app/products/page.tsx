"use client";

import Navbar from "@/components/site/navbar";
import Footer from "@/components/site/footer";
import Image from "next/image";
import {
    Search,
    ChevronDown,
    LayoutGrid,
    Command,
    List,
} from "lucide-react";
import ProductFilters from "@/components/catalog/product-filters";

const products = [
    {
        id: 1,
        title: "بلبرینگ SKF 6205",
        category: "بلبرینگ",
        price: "۲,۴۵۰,۰۰۰",
        image: "/products/bearing.jpg",
        stock: "موجود",
        wholesale: true,
        brand: "SKF",
    },
    {
        id: 2,
        title: "تسمه صنعتی BANDO",
        category: "تسمه",
        price: "۸۹۰,۰۰۰",
        image: "/products/belt.jpg",
        stock: "موجود",
        wholesale: false,
        brand: "BANDO",
    },
    {
        id: 3,
        title: "پولی آلومینیومی",
        category: "پولی",
        price: "۱,۷۵۰,۰۰۰",
        image: "/products/pulley.jpg",
        stock: "محدود",
        wholesale: true,
        brand: "OPTIBELT",
    },
    {
        id: 4,
        title: "زنجیر صنعتی Heavy Duty",
        category: "زنجیر",
        price: "۳,۳۰۰,۰۰۰",
        image: "/products/chain.jpg",
        stock: "موجود",
        wholesale: true,
        brand: "NSK",
    },
];

export default function ProductsPage() {

    return (
        <>
            <Navbar />

            <main className="pt-32 pb-24 bg-slate-50">

                <section>
                    <div className="mx-auto max-w-[1450px] px-8">

                        {/* HERO */}

                        <div className="mb-14">
                            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-medium text-blue-700">
                                کاتالوگ محصولات
                            </span>

                            <h1 className="mt-7 text-5xl font-black leading-tight text-slate-900">
                                محصولات صنعتی
                            </h1>

                            <p className="mt-5 max-w-[720px] text-[15px] leading-8 text-slate-600">
                                جستجو، فیلتر و خرید تخصصی
                                بلبرینگ، تسمه، پولی و زنجیر صنعتی.
                            </p>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-[290px_1fr]">

                            {/* FILTERS */}
                            <ProductFilters />

                            {/* PRODUCTS */}
                            <div>
                                {/* TOOLBAR */}
                                {/* PREMIUM TOOLBAR */}
                                <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white">
                                    {/* TOP */}
                                    <div className="flex flex-col gap-5 border-b border-slate-100 p-6 xl:flex-row xl:items-center xl:justify-between">
                                        {/* SEARCH */}
                                        <div className="relative flex-1">
                                            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition focus-within:border-blue-500 focus-within:bg-white">
                                                <Search size={18} className="text-slate-400" />
                                                <input placeholder="جستجوی محصول، برند، کد فنی..." className="w-full bg-transparent text-sm outline-none " />
                                                <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 lg:flex">
                                                    <Command size={13} />
                                                    K
                                                </div>
                                            </div>

                                            {/* SEARCH DROPDOWN */}
                                            <div className="absolute right-0 left-0 top-full z-30 mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                                                <p className="mb-4 text-xs font-medium uppercase tracking-[2px] text-slate-400">
                                                    جستجوهای پیشنهادی
                                                </p>
                                                <div className="flex flex-wrap gap-3">
                                                    <SearchChip>
                                                        بلبرینگ SKF
                                                    </SearchChip>
                                                    <SearchChip>
                                                        تسمه BANDO
                                                    </SearchChip>
                                                    <SearchChip>
                                                        6205 Bearing
                                                    </SearchChip>
                                                    <SearchChip>
                                                        زنجیر صنعتی
                                                    </SearchChip>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ACTIONS */}
                                        <div className="flex flex-wrap items-center gap-4">

                                            {/* SORT */}
                                            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-5 py-4">

                                                <span className="text-sm text-slate-500">
                                                    مرتب سازی
                                                </span>

                                                <select className="bg-transparent text-sm font-medium outline-none">
                                                    <option>
                                                        جدیدترین
                                                    </option>
                                                    <option>
                                                        ارزان‌ترین
                                                    </option>
                                                    <option>
                                                        گران‌ترین
                                                    </option>
                                                    <option>
                                                        پرفروش‌ترین
                                                    </option>
                                                </select>
                                            </div>

                                            {/* VIEW SWITCH */}

                                            <div className="flex overflow-hidden rounded-2xl border border-slate-200">
                                                <button className="flex h-[54px] w-[54px] items-center justify-center bg-blue-50 text-blue-700">
                                                    <LayoutGrid size={18} />
                                                </button>

                                                <button className="flex h-[54px] w-[54px] items-center justify-center text-slate-500">
                                                    <List size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* BOTTOM */}

                                    <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">

                                        <div className="flex flex-wrap gap-3">
                                            <CategoryChip>
                                                بلبرینگ
                                            </CategoryChip>

                                            <CategoryChip>
                                                تسمه
                                            </CategoryChip>

                                            <CategoryChip>
                                                پولی
                                            </CategoryChip>

                                            <CategoryChip>
                                                زنجیر
                                            </CategoryChip>

                                            <CategoryChip>
                                                SKF
                                            </CategoryChip>

                                            <CategoryChip>
                                                عمده
                                            </CategoryChip>
                                        </div>

                                        {/* RESULTS */}

                                        <div className="flex items-center gap-4">
                                            <p className="text-sm text-slate-500">
                                                نمایش
                                                <span className="mx-2 font-bold text-slate-900">
                                                    ۲۴
                                                </span>
                                                محصول
                                            </p>

                                            <button className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 transition hover:border-blue-300 hover:text-blue-700">
                                                فیلتر فعال: ۳
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* GRID */}
                                <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            {...product}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

function FilterBlock({
    title,
    items,
}: any) {

    return (
        <div className="mt-10">
            <button className="flex w-full items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">
                    {title}
                </h4>
                <ChevronDown size={16} className="text-slate-400" />
            </button>

            <div className="mt-5 space-y-4">
                {items.map((item: string) => (
                    <label
                        key={item}
                        className="flex items-center justify-between text-sm text-slate-600 "
                    >
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 " />
                            {item}
                        </div>

                        <span className="text-xs text-slate-400">
                            120
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}

function CategoryChip({
    children,
}: any) {
    return (
        <button className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
            {children}
        </button>
    );
}

function ProductCard({
    title,
    category,
    price,
    image,
    stock,
    wholesale,
    brand,
}: any) {

    return (
        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-[240px] overflow-hidden bg-slate-100">
                <Image src={image} alt={title} fill className="object-cover transition duration-500 hover:scale-105 " />
                <div className="absolute right-4 top-4 flex gap-2">
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 backdrop-blur">
                        {category}
                    </span>
                    {wholesale && (
                        <span className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white">
                            عمده
                        </span>
                    )}
                </div>

            </div>

            <div className="p-6">
                <p className="text-xs uppercase tracking-[2px] text-slate-400">
                    {brand}
                </p>
                <h3 className="mt-3 text-lg font-bold leading-8 text-slate-900">
                    {title}
                </h3>
                <div className="mt-6 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-400">
                            قیمت
                        </p>
                        <h4 className="mt-2 text-xl font-black text-slate-900">
                            {price}
                        </h4>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                        {stock}
                    </span>
                </div>

                <button className="mt-7 w-full rounded-2xl border border-slate-200 bg-slate-900 py-4 text-sm font-medium text-white transition hover:bg-blue-600">
                    مشاهده محصول
                </button>
            </div>
        </article>
    );
}

function SearchChip({
    children,
}: any) {
    return (
        <button className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
            {children}
        </button>
    );

}