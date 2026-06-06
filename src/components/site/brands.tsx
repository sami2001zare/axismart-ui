'use client';

const brands = ['SKF', 'BANDO', 'NSK', 'FAG', 'TIMKEN', 'OPTIBELT'];

export default function BrandsSection() {
    return (
        <section className="py-28">
            <div className="mx-auto max-w-[1450px] px-8">
                <div className="text-center">
                    <h2 className="text-4xl font-black text-slate-900">برندهای همکار</h2>

                    <p className="mt-6 text-slate-600">تامین‌کننده برندهای معتبر صنعتی</p>
                </div>

                <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                    {brands.map((brand) => (
                        <div
                            key={brand}
                            className="flex h-[120px] items-center justify-center border border-slate-200 bg-white text-3xl font-black text-slate-400"
                        >
                            {brand}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
