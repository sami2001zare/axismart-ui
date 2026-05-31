"use client";

import Navbar from "@/components/site/navbar";
import Footer from "@/components/site/footer";

export default function ContactPage() {
    return (
        <>
            <Navbar />

            <main className="pt-36 py-28">

                <div className="mx-auto max-w-[1450px] px-8">

                    <h1 className="
          text-7xl
          font-black
          text-slate-900
          ">
                        تماس با ما
                    </h1>

                    <p className="
          mt-8
          max-w-[800px]
          text-xl
          leading-[2]
          text-slate-600
          ">
                        برای خرید عمده، همکاری سازمانی،
                        سفارش پروژه‌ای و دریافت مشاوره تخصصی
                        با ما در ارتباط باشید.
                    </p>

                    <div className="
          mt-20
          grid gap-10
          lg:grid-cols-2
          ">

                        <form className="
            border border-slate-200
            bg-white
            p-10
            space-y-6
            ">

                            <Input placeholder="نام و نام خانوادگی" />
                            <Input placeholder="ایمیل" />
                            <Input placeholder="شماره تماس" />

                            <textarea
                                placeholder="پیام شما"
                                className="
                h-[180px]
                w-full
                border border-slate-300
                p-5
                outline-none
                "
                            />

                            <button className="
              bg-blue-600
              px-8 py-4
              text-white
              ">
                                ارسال پیام
                            </button>

                        </form>

                        <div className="space-y-8">

                            <ContactCard
                                title="ایمیل"
                                value="info@axismart.com"
                            />

                            <ContactCard
                                title="شماره تماس"
                                value="+98 21 000000"
                            />

                            <ContactCard
                                title="آدرس"
                                value="تهران، ایران"
                            />

                        </div>

                    </div>

                </div>

            </main>

            <Footer />
        </>
    );
}

function Input(props: any) {
    return (
        <input
            {...props}
            className="
      w-full
      border border-slate-300
      p-4
      outline-none
      "
        />
    );
}

function ContactCard({ title, value }: any) {
    return (
        <div className="
    border border-slate-200
    bg-slate-50
    p-8
    ">
            <h3 className="
      text-xl
      font-black
      text-slate-900
      ">
                {title}
            </h3>

            <p className="
      mt-4
      text-slate-600
      ">
                {value}
            </p>
        </div>
    );
}