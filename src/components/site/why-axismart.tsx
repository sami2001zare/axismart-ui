'use client';

import { motion } from 'framer-motion';

const items = [
    {
        title: 'تضمین اصالت کالا',
        desc: 'تامین مستقیم قطعات صنعتی با کنترل کیفیت و اصالت.',
        icon: '✓',
    },
    {
        title: 'فروش خرده و عمده',
        desc: 'پشتیبانی کامل از سفارش‌های سازمانی و خریدهای همکاری.',
        icon: '◎',
    },
    {
        title: 'ارسال سریع',
        desc: 'تحویل سریع سفارش‌ها برای پروژه‌ها و خطوط تولید.',
        icon: '→',
    },
    {
        title: 'مشاوره تخصصی',
        desc: 'راهنمایی تخصصی انتخاب قطعات صنعتی توسط کارشناسان.',
        icon: '◉',
    },
];

export default function WhyAxisMart() {
    return (
        <section className="bg-slate-50 py-32">
            <div className="mx-auto max-w-[1450px] px-8">
                <div className="mb-20">
                    <span className="border border-blue-200 bg-blue-50 px-5 py-2 text-sm text-blue-700">
                        چرا اکسیس مارت
                    </span>

                    <h2 className="mt-8 max-w-212.5 text-5xl leading-normal font-black text-slate-900">
                        زیرساخت حرفه‌ای برای تامین قطعات صنعتی
                    </h2>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,.05)]"
                        >
                            <div className="flex h-16 w-16 items-center justify-center bg-blue-600 text-2xl text-white">
                                {item.icon}
                            </div>

                            <h3 className="mt-8 text-2xl font-black text-slate-900">
                                {item.title}
                            </h3>

                            <p className="mt-5 leading-loose text-slate-600">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
