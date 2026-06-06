'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function WholesaleSection() {
    return (
        <section className="relative overflow-hidden py-36">
            {/* Background */}

            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950" />

            <div className="absolute top-[-200px] left-[-120px] h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-[140px]" />

            <div className="absolute right-[-80px] bottom-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-500/20 blur-[120px]" />

            <div className="relative mx-auto max-w-[1450px] px-8">
                <div className="grid items-center gap-20 lg:grid-cols-2">
                    {/* LEFT */}

                    <motion.div
                        initial={{ opacity: 0, x: 70 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-flex border border-blue-400/20 bg-blue-500/10 px-5 py-3 text-sm text-blue-300">
                            فروش سازمانی و خرید عمده
                        </span>

                        <h2 className="mt-10 text-6xl leading-[1.45] font-black text-white">
                            راهکار حرفه‌ای برای تامین قطعات صنعتی
                        </h2>

                        <p className="mt-10 max-w-[680px] text-xl leading-[2.1] text-slate-300">
                            خرید عمده با قیمت همکاری، حساب‌های سازمانی، ثبت سفارش سریع، مشاوره تخصصی
                            و تامین پروژه‌های صنعتی.
                        </p>

                        {/* BENEFITS */}

                        <div className="mt-14 grid gap-5 sm:grid-cols-2">
                            <Benefit>قیمت همکاری</Benefit>

                            <Benefit>پشتیبانی اختصاصی</Benefit>

                            <Benefit>پرداخت سازمانی</Benefit>

                            <Benefit>تامین پروژه‌ای</Benefit>
                        </div>

                        {/* CTA */}

                        <div className="mt-14 flex flex-wrap gap-5">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-blue-600 px-8 py-4 font-medium text-white shadow-xl shadow-blue-950/30"
                            >
                                شروع همکاری سازمانی
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                className="border border-white/15 bg-white/5 px-8 py-4 text-white backdrop-blur-xl"
                            >
                                دریافت مشاوره
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* RIGHT */}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                        className="relative"
                    >
                        {/* Floating RFQ */}

                        <motion.div
                            animate={{
                                y: [0, -12, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                            }}
                            className="absolute -top-10 -left-10 z-20 border border-white/10 bg-white/10 p-6 backdrop-blur-2xl"
                        >
                            <p className="text-sm text-slate-400">RFQ Request</p>

                            <h4 className="mt-3 text-3xl font-black text-white">24h</h4>
                        </motion.div>

                        {/* Main Enterprise Card */}

                        <div className="overflow-hidden border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
                            <div className="space-y-6">
                                <EnterpriseRow
                                    title="حساب سازمانی"
                                    value="فعال"
                                    accent="bg-emerald-400"
                                />

                                <EnterpriseRow
                                    title="قیمت همکاری"
                                    value="-25%"
                                    accent="bg-blue-500"
                                />

                                <EnterpriseRow
                                    title="سفارش پروژه‌ای"
                                    value="B2B"
                                    accent="bg-orange-400"
                                />

                                <EnterpriseRow title="پشتیبانی" value="24/7" accent="bg-cyan-400" />
                            </div>

                            {/* Metrics */}

                            <div className="mt-10 grid grid-cols-3 gap-4">
                                <Metric value="120+" label="شرکت" />

                                <Metric value="2500+" label="محصول" />

                                <Metric value="98%" label="رضایت" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function Benefit({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-4 border border-white/10 bg-white/5 px-5 py-4 text-slate-200">
            <div className="h-3 w-3 bg-blue-400" />

            {children}
        </div>
    );
}

function EnterpriseRow({ title, value, accent }: { title: string; value: string; accent: string }) {
    return (
        <div className="flex items-center justify-between border border-white/10 bg-white/5 px-6 py-5">
            <div className="flex items-center gap-4">
                <div className={`h-4 w-4 rounded-full ${accent}`} />

                <span className="text-slate-300">{title}</span>
            </div>

            <span className="font-black text-white">{value}</span>
        </div>
    );
}

function Metric({ value, label }: { value: string; label: string }) {
    return (
        <div className="border border-white/10 bg-white/5 p-5 text-center">
            <h4 className="text-3xl font-black text-blue-400">{value}</h4>

            <p className="mt-3 text-sm text-slate-400">{label}</p>
        </div>
    );
}
