import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-[1450px] px-8 py-20">
                <div className="grid gap-14 lg:grid-cols-4">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900">بلبرینگ پارسا</h2>

                        <p className="mt-6 leading-[2] text-slate-600">
                            پلتفرم تخصصی تامین قطعات صنعتی برای خرید خرده و عمده.
                        </p>
                    </div>

                    <FooterCol title="دسترسی سریع" links={['خانه', 'محصولات', 'درباره ما']} />

                    <FooterCol title="خدمات" links={['خرید عمده', 'پشتیبانی', 'مشاوره']} />

                    <FooterCol title="ارتباط" links={['info@axismart.com', '+98 21 000000']} />
                </div>
            </div>
        </footer>
    );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
    return (
        <div>
            <h3 className="font-black text-slate-900">{title}</h3>

            <div className="mt-6 flex flex-col gap-4">
                {links.map((link: string) => (
                    <Link key={link} href="/" className="text-slate-600 hover:text-blue-600">
                        {link}
                    </Link>
                ))}
            </div>
        </div>
    );
}
