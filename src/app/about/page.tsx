"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/site/navbar";
import Footer from "@/components/site/footer";

export default function AboutPage() {
    return (
        <>
            <Navbar />

            <main className="pt-36">

                <section className="py-28">

                    <div className="mx-auto max-w-[1450px] px-8">

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >

                            <span className="
              border border-blue-200
              bg-blue-50
              px-5 py-2
              text-sm text-blue-700
              ">
                                درباره ما
                            </span>

                            <h1 className="
              mt-10
              max-w-[900px]
              text-7xl
              font-black
              leading-[1.4]
              text-slate-900
              ">
                                پلتفرم تخصصی
                                تامین قطعات صنعتی
                            </h1>

                            <p className="
              mt-12
              max-w-[900px]
              text-xl
              leading-[2.2]
              text-slate-600
              ">
                                AxisMart با تمرکز بر تامین تخصصی
                                بلبرینگ، تسمه، پولی و زنجیر صنعتی،
                                زیرساختی حرفه‌ای برای خرید خرده،
                                عمده و پروژه‌ای ایجاد کرده است.
                            </p>

                        </motion.div>

                    </div>

                </section>

                <section className="bg-slate-50 py-28">

                    <div className="mx-auto max-w-[1450px] px-8">

                        <div className="grid gap-8 lg:grid-cols-3">

                            <Stat number="2500+" label="محصول" />
                            <Stat number="120+" label="برند" />
                            <Stat number="24/7" label="پشتیبانی" />

                        </div>

                    </div>

                </section>

                <section className="py-28">

                    <div className="mx-auto max-w-[1450px] px-8">

                        <div className="grid gap-14 lg:grid-cols-2">

                            <InfoCard
                                title="ماموریت ما"
                                text="تسهیل تامین قطعات صنعتی با تجربه‌ای سریع، شفاف و حرفه‌ای."
                            />

                            <InfoCard
                                title="چشم‌انداز ما"
                                text="تبدیل شدن به مرجع مدرن تجارت صنعتی و خرید سازمانی."
                            />

                        </div>

                    </div>

                </section>

            </main>

            <Footer />
        </>
    );
}

function Stat({ number, label }: { number: string, label: string }) {
    return (
        <div className="
    border border-slate-200
    bg-white
    p-12
    text-center
    ">
            <h3 className="text-6xl font-black text-blue-600">
                {number}
            </h3>

            <p className="
      mt-6
      text-slate-500
      ">
                {label}
            </p>
        </div>
    );
}

function InfoCard({ title, text }: { title: string, text: string }) {
    return (
        <div className="
    border border-slate-200
    bg-white
    p-10
    shadow-[0_20px_50px_rgba(15,23,42,.05)]
    ">
            <h2 className="
      text-4xl
      font-black
      text-slate-900
      ">
                {title}
            </h2>

            <p className="
      mt-8
      text-lg
      leading-[2]
      text-slate-600
      ">
                {text}
            </p>
        </div>
    );
}