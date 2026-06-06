'use client';

import { motion } from 'framer-motion';

const categories = [
    {
        title: 'بلبرینگ',
        subtitle: 'Precision Bearings',
        description: 'بلبرینگ‌های صنعتی تخصصی برای ماشین‌آلات، خطوط تولید و تجهیزات سنگین.',
        icon: '⚙️',
        size: 'large',
        color: 'from-blue-600 to-cyan-500',
    },
    {
        title: 'تسمه صنعتی',
        subtitle: 'Industrial Belts',
        description: 'تسمه‌های انتقال قدرت با کیفیت بالا برای کاربردهای صنعتی.',
        icon: '🔗',
        size: 'small',
        color: 'from-emerald-500 to-teal-500',
    },
    {
        title: 'پولی',
        subtitle: 'Pulley Systems',
        description: 'سیستم‌های پولی مقاوم برای انتقال دقیق نیرو.',
        icon: '⭕',
        size: 'small',
        color: 'from-orange-500 to-amber-500',
    },
    {
        title: 'زنجیر صنعتی',
        subtitle: 'Industrial Chains',
        description: 'زنجیرهای صنعتی مقاوم برای خطوط تولید و تجهیزات سنگین.',
        icon: '⛓️',
        size: 'wide',
        color: 'from-violet-600 to-fuchsia-500',
    },
];

export default function CategoriesSection() {
    return (
        <section className="relative py-32">
            <div className="mx-auto max-w-[1450px] px-8">
                {/* Heading */}

                <div className="mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex border border-blue-200 bg-blue-50 px-5 py-2 text-sm text-blue-700"
                    >
                        دسته‌بندی محصولات
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-8 max-w-[900px] text-5xl leading-[1.5] font-black text-slate-900"
                    >
                        تامین تخصصی قطعات صنعتی برای پروژه‌های حرفه‌ای
                    </motion.h2>
                </div>

                {/* Premium Layout */}

                <div className="grid grid-cols-12 gap-6">
                    {categories.map((category, index) => (
                        <CategoryCard key={index} {...category} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CategoryCard({
    title,
    subtitle,
    description,
    icon,
    size,
    color,
}: {
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    size: string;
    color: string;
}) {
    const layout = {
        large: 'col-span-12 lg:col-span-7 min-h-[420px]',
        small: 'col-span-12 md:col-span-6 lg:col-span-5 min-h-[200px]',
        wide: 'col-span-12 min-h-[250px]',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
                y: -10,
            }}
            className={`relative overflow-hidden border border-slate-200 bg-white p-10 shadow-[0_30px_60px_rgba(15,23,42,.06)] transition-all duration-500 ${layout[size]}`}
        >
            {/* Gradient Accent */}
            <div className={`absolute top-0 right-0 h-2 w-full bg-gradient-to-r ${color}`} />

            {/* Glow */}
            <div
                className={`absolute -top-20 -left-20 h-[220px] w-[220px] rounded-full bg-gradient-to-r ${color} opacity-[0.08] blur-[70px]`}
            />
            <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm tracking-[4px] text-slate-400 uppercase">
                                {subtitle}
                            </p>
                            <h3 className="mt-4 text-4xl font-black text-slate-900">{title}</h3>
                        </div>

                        <div className="text-6xl">{icon}</div>
                    </div>

                    <p className="mt-8 max-w-[500px] text-lg leading-[2] text-slate-600">
                        {description}
                    </p>
                </div>

                {/* CTA */}
                <motion.button
                    whileHover={{
                        x: -6,
                    }}
                    className="mt-12 flex items-center gap-3 font-bold text-blue-600"
                >
                    مشاهده محصولات ←
                </motion.button>
            </div>
        </motion.div>
    );
}
