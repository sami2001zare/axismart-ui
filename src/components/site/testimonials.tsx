'use client';

const reviews = [
    {
        name: 'شرکت پارس صنعت',
        text: 'تجربه خرید سریع، قیمت همکاری عالی و پشتیبانی تخصصی.',
    },
    {
        name: 'کارخانه آریا ماشین',
        text: 'کیفیت تامین قطعات و زمان تحویل بسیار حرفه‌ای بود.',
    },
];

export default function Testimonials() {
    return (
        <section className="bg-slate-50 py-32">
            <div className="mx-auto max-w-[1450px] px-8">
                <h2 className="text-center text-5xl font-black text-slate-900">
                    اعتماد صنعت به بلبرینگ پارسا
                </h2>

                <div className="mt-20 grid gap-8 lg:grid-cols-2">
                    {reviews.map((review) => (
                        <div
                            key={review.name}
                            className="border border-slate-200 bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,.05)]"
                        >
                            {/* <div className="text-5xl text-blue-600">
                                "
                            </div> */}

                            <p className="mt-8 text-lg leading-[2] text-slate-600">{review.text}</p>

                            <h4 className="mt-10 font-black text-slate-900">{review.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
