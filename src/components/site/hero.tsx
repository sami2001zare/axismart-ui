'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-40 pb-28">
            {/* Background Accent */}

            <div className="absolute top-[-200px] left-[-120px] h-[450px] w-[450px] rounded-full bg-blue-100 blur-[140px]" />
            <div className="absolute right-[-100px] bottom-[-180px] h-[350px] w-[350px] rounded-full bg-cyan-100 blur-[120px]" />
            <div className="mx-auto max-w-[1450px] px-8">
                <div className="grid items-center gap-20 lg:grid-cols-2">
                    {/* LEFT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: 70 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9 }}
                    >
                        {/* Badge */}
                        <div className="mb-8 inline-flex items-center gap-3 border border-blue-200 bg-blue-50 px-5 py-3 text-sm text-blue-700">
                            ⚙️ نسل جدید تامین قطعات صنعتی
                        </div>

                        {/* Title */}

                        <h1 className="text-6xl leading-[1.5] font-black text-slate-900">
                            خرید تخصصی
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                {' '}
                                بلبرینگ، تسمه، پولی
                            </span>
                            <br />و زنجیر صنعتی
                        </h1>

                        {/* Description */}
                        <p className="mt-10 max-w-[680px] text-xl leading-[2.1] text-slate-600">
                            فروش خرده و عمده قطعات صنعتی با تضمین اصالت کالا، قیمت همکاری، ارسال
                            سریع و مشاوره تخصصی.
                        </p>

                        {/* CTA */}

                        <div className="mt-12 flex flex-wrap gap-5">
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-blue-600 px-8 py-4 font-medium text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                            >
                                مشاهده محصولات
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className="border border-slate-300 bg-white px-8 py-4 font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
                            >
                                خرید عمده
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* RIGHT VISUAL */}
                    <HeroVisual />
                </div>
            </div>
        </section>
    );
}

function HeroVisual() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center"
        >
            {/* Floating Card */}

            <motion.div
                animate={{
                    y: [0, -12, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 5,
                }}
                className="absolute top-8 -left-8 z-20 border border-blue-200 bg-white px-6 py-5 shadow-xl"
            >
                <p className="text-sm text-slate-500">فروش عمده فعال</p>

                <h3 className="mt-2 text-3xl font-black text-blue-600">B2B</h3>
            </motion.div>

            {/* Main Panel */}

            <div className="w-full max-w-[640px] border border-slate-200 bg-white p-8 shadow-[0_35px_80px_rgba(15,23,42,.08)]">
                <div className="grid grid-cols-2 gap-5">
                    <Card title="بلبرینگ" icon="⚙️" />

                    <Card title="تسمه" icon="🔗" />

                    <Card title="پولی" icon="⭕" />

                    <Card title="زنجیر صنعتی" icon="⛓️" />
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                    <Metric number="2500+" label="محصول" />

                    <Metric number="120+" label="برند" />

                    <Metric number="24/7" label="پشتیبانی" />
                </div>
            </div>
        </motion.div>
    );
}

function Card({ title, icon }: { title: string; icon: string }) {
    return (
        <motion.div
            whileHover={{
                y: -6,
            }}
            className="border border-slate-200 bg-slate-50 p-6 transition"
        >
            <div className="text-4xl">{icon}</div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>

            <p className="mt-2 text-sm text-slate-500">تامین تخصصی صنعتی</p>
        </motion.div>
    );
}

function Metric({ number, label }: { number: string; label: string }) {
    return (
        <div className="border border-slate-200 bg-slate-50 p-5 text-center">
            <h4 className="text-2xl font-black text-blue-600">{number}</h4>

            <p className="mt-2 text-sm text-slate-500">{label}</p>
        </div>
    );
}
