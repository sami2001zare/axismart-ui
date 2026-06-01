"use client";

export default function CtaBanner() {
    return (
        <section className="py-32">
            <div className="mx-auto max-w-[1450px] px-8">
                <div className=" overflow-hidden bg-blue-600 p-16 text-white ">
                    <h2 className=" max-w-[900px] text-5xl font-black leading-[1.5] ">
                        آماده تامین پروژه صنعتی شما هستیم
                    </h2>

                    <p className=" mt-8 max-w-[700px] text-xl text-blue-100 ">
                        برای خرید عمده، همکاری سازمانی و سفارش پروژه‌ای با ما در ارتباط باشید.
                    </p>

                    <button className=" mt-12 bg-white px-8 py-4 font-medium text-blue-600 ">
                        شروع همکاری
                    </button>
                </div>
            </div>
        </section>
    );
}