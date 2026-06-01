"use client";

import { motion } from "framer-motion";

const products = [
    {
        title: "بلبرینگ SKF 6205",
        category: "بلبرینگ",
        price: "۲,۴۵۰,۰۰۰",
        wholesale: true,
        stock: "موجود",
        icon: "⚙️",
        accent: "blue",
    },
    {
        title: "تسمه صنعتی BANDO",
        category: "تسمه",
        price: "۸۹۰,۰۰۰",
        wholesale: false,
        stock: "موجود",
        icon: "🔗",
        accent: "emerald",
    },
    {
        title: "پولی آلومینیومی",
        category: "پولی",
        price: "۱,۷۵۰,۰۰۰",
        wholesale: true,
        stock: "محدود",
        icon: "⭕",
        accent: "orange",
    },
];

export default function FeaturedProducts() {
    return (
        <section className="relative py-32 overflow-hidden">

            {/* Background */}

            <div className="absolute inset-0 bg-slate-50" />

            <div className="relative mx-auto max-w-[1450px] px-8">

                {/* Heading */}

                <div className="mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <span className=" inline-flex border border-blue-200 bg-blue-50 px-5 py-2 text-sm text-blue-700 ">
                            محصولات ویژه
                        </span>

                        <h2 className=" mt-8 max-w-[900px] text-5xl font-black leading-[1.5] text-slate-900 ">
                            انتخاب حرفه‌ای
                            برای صنعت،
                            تولید
                            و پروژه‌های تخصصی
                        </h2>

                    </div>

                    <button className=" mt-8 lg:mt-0 border border-slate-300 bg-white px-8 py-4 font-medium hover:border-blue-500 ">
                        مشاهده همه محصولات
                    </button>
                </div>

                {/* Layout */}

                <div className="grid gap-8 lg:grid-cols-12">
                    <PremiumShowcase />
                    <div className="lg:col-span-5 space-y-6">
                        {products.map((product, index) => (
                            <ProductCard
                                key={index}
                                {...product}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function PremiumShowcase() {

    return (
        <motion.div whileHover={{ y: -10 }} className=" relative overflow-hidden border border-slate-200 bg-white lg:col-span-7 p-12 shadow-[0_35px_80px_rgba(15,23,42,.06)] ">

            {/* Accent */}
            <div className=" absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-blue-600 to-cyan-500 " />

            {/* Glow */}
            <div className=" absolute -left-32 top-0 h-[300px] w-[300px] rounded-full bg-blue-100 blur-[90px] " />

            <div className="relative">
                <div className=" flex items-center justify-between ">
                    <span className=" bg-emerald-100 text-emerald-700 px-4 py-2 text-sm ">
                        پرفروش‌ترین محصول
                    </span>
                    <span className=" text-sm text-slate-400 ">
                        AXM-2026
                    </span>
                </div>

                <div className="mt-14 grid lg:grid-cols-2 gap-10 items-center">
                    {/* LEFT */}
                    <div>
                        <h3 className=" text-5xl font-black leading-[1.4] text-slate-900 ">
                            بلبرینگ صنعتی SKF
                        </h3>

                        <p className=" mt-8 text-lg leading-[2] text-slate-600 ">
                            مناسب برای ماشین‌آلات، خطوط تولید، تجهیزات صنعتی و پروژه‌های تخصصی. </p>
                        <div className=" mt-10 flex flex-wrap gap-3 ">
                            <Tag>ضمانت اصالت</Tag>
                            <Tag>فروش عمده</Tag>
                            <Tag>ارسال سریع</Tag>
                        </div>

                        <div className="mt-14">
                            <p className=" text-sm text-slate-400 ">
                                شروع قیمت
                            </p>

                            <h4 className=" mt-3 text-4xl font-black text-blue-600 ">
                                ۲,۴۵۰,۰۰۰ تومان
                            </h4>
                        </div>
                    </div>

                    {/* RIGHT VISUAL */}
                    <motion.div
                        animate={{
                            y: [0, -12, 0],
                            rotate: [0, 4, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 6,
                        }}
                        className=" flex justify-center ">

                        <div className=" flex h-[260px] w-[260px] items-center justify-center rounded-full border-[20px] border-slate-300 bg-gradient-to-br from-slate-100 to-slate-300 text-[110px] shadow-2xl ">
                            ⚙️
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

function ProductCard({
    title,
    category,
    price,
    wholesale,
    stock,
    icon,
}: any) {

    return (
        <motion.div
            whileHover={{
                x: -8,
            }}
            className=" border border-slate-200 bg-white p-7 shadow-[0_20px_40px_rgba(15,23,42,.05)] transition ">

            <div className=" flex items-start justify-between ">
                <div>
                    <span className=" text-xs uppercase tracking-[3px] text-slate-400 ">
                        {category}
                    </span>

                    <h3 className=" mt-4 text-2xl font-black text-slate-900 ">
                        {title}
                    </h3>
                </div>

                <div className="text-5xl">
                    {icon}
                </div>
            </div>

            <div className=" mt-8 flex items-center gap-3 flex-wrap ">
                {wholesale && <Tag>عمده</Tag>}
                <Tag>{stock}</Tag>
            </div>

            <div className=" mt-10 flex items-center justify-between ">
                <div>
                    <p className=" text-sm text-slate-400 ">
                        قیمت
                    </p>

                    <h4 className=" mt-2 text-2xl font-black text-blue-600 ">
                        {price}
                    </h4>
                </div>

                <button className=" bg-blue-600 px-5 py-3 text-sm text-white hover:bg-blue-700 ">
                    مشاهده
                </button>
            </div>
        </motion.div>
    );
}

function Tag({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className=" border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 ">
            {children}
        </div>
    );
}