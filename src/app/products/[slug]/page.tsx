// src/app/products/[slug]/page.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/site/navbar";
import Footer from "@/components/site/footer";
import {
    ChevronLeft,
    Heart,
    Share2,
    Download,
    ShieldCheck,
    Truck,
    Plus,
    Minus,
    CheckCircle2,
} from "lucide-react";

const gallery = [
    "/products/bearing.jpg",
    "/products/bearing-2.jpg",
    "/products/bearing-3.jpg",
    "/products/bearing-4.jpg",
];

const related = [
    {
        title: "بلبرینگ SKF 6305",
        price: "۳,۱۰۰,۰۰۰",
        image: "/products/bearing.jpg",
    },
    {
        title: "بلبرینگ NSK 6205",
        price: "۲,۹۰۰,۰۰۰",
        image: "/products/bearing.jpg",
    },
    {
        title: "بلبرینگ FAG 6205",
        price: "۲,۷۰۰,۰۰۰",
        image: "/products/bearing.jpg",
    },
];

export default function ProductPage() {

    const [active, setActive] = useState(gallery[0]);
    const [qty, setQty] = useState(1);
    const [tab, setTab] = useState("specs");

    return (

        <>

            <Navbar />

            <main className="bg-slate-50 pt-28 pb-24">

                <div className="mx-auto max-w-[1450px] px-8">

                    {/* BREADCRUMBS */}

                    <div className="
mb-10
flex
items-center
gap-3
text-sm
text-slate-500
">

                        <Link href="/">خانه</Link>

                        <ChevronLeft size={15} />

                        <Link href="/products">
                            محصولات
                        </Link>

                        <ChevronLeft size={15} />

                        <span className="text-slate-900">
                            بلبرینگ SKF 6205
                        </span>

                    </div>

                    <div className="
grid
gap-8
xl:grid-cols-[1.1fr_430px]
">

                        {/* LEFT */}

                        <div className="space-y-8">

                            {/* HERO */}

                            <div className="
rounded-[34px]
border border-slate-200
bg-white
p-8
">

                                <div className="
grid
gap-8
xl:grid-cols-[120px_1fr]
">

                                    {/* THUMBS */}

                                    <div className="
flex
gap-4
xl:flex-col
">

                                        {gallery.map((img) => (

                                            <button
                                                key={img}
                                                onClick={() => setActive(img)}
                                                className={`
relative
h-[95px]
w-[95px]
overflow-hidden
rounded-2xl
border
transition
${active === img
                                                        ?
                                                        "border-blue-600"
                                                        :
                                                        "border-slate-200"
                                                    }
`}
                                            >

                                                <Image
                                                    src={img}
                                                    alt=""
                                                    fill
                                                    className="object-cover"
                                                />

                                            </button>

                                        ))}

                                    </div>

                                    {/* IMAGE */}

                                    <div className="
relative
h-[640px]
overflow-hidden
rounded-[28px]
bg-slate-100
">

                                        <Image
                                            src={active}
                                            alt="product"
                                            fill
                                            priority
                                            className="
object-cover
transition
duration-500
hover:scale-105
"
                                        />

                                        <div className="
absolute
left-5
top-5
flex
gap-3
">

                                            <CircleBtn>
                                                <Heart size={17} />
                                            </CircleBtn>

                                            <CircleBtn>
                                                <Share2 size={17} />
                                            </CircleBtn>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* TABS */}

                            <div className="
overflow-hidden
rounded-[34px]
border border-slate-200
bg-white
">

                                <div className="
flex
overflow-x-auto
border-b
border-slate-100
">

                                    <Tab
                                        active={tab === "specs"}
                                        onClick={() => setTab("specs")}
                                    >
                                        مشخصات
                                    </Tab>

                                    <Tab
                                        active={tab === "description"}
                                        onClick={() => setTab("description")}
                                    >
                                        توضیحات
                                    </Tab>

                                    <Tab
                                        active={tab === "shipping"}
                                        onClick={() => setTab("shipping")}
                                    >
                                        ارسال
                                    </Tab>

                                </div>

                                <div className="p-8">

                                    {tab === "specs" && (

                                        <div className="space-y-2">

                                            <SpecRow label="برند" value="SKF" />
                                            <SpecRow label="مدل" value="6205" />
                                            <SpecRow label="قطر داخلی" value="25mm" />
                                            <SpecRow label="قطر خارجی" value="52mm" />
                                            <SpecRow label="کشور سازنده" value="Sweden" />
                                            <SpecRow label="استاندارد" value="ISO 9001" />

                                        </div>

                                    )}

                                    {tab === "description" && (

                                        <p className="
text-[15px]
leading-9
text-slate-600
">

                                            بلبرینگ SKF 6205 مناسب
                                            خطوط تولید، ماشین‌آلات صنعتی،
                                            سیستم‌های انتقال قدرت و کاربردهای
                                            مهندسی سنگین.

                                        </p>

                                    )}

                                    {tab === "shipping" && (

                                        <div className="
grid
gap-5
md:grid-cols-2
">

                                            <InfoCard
                                                title="ارسال سریع"
                                                text="ارسال ۲۴ تا ۷۲ ساعت."
                                            />

                                            <InfoCard
                                                title="تحویل سازمانی"
                                                text="پشتیبانی خرید پروژه‌ای."
                                            />

                                        </div>

                                    )}

                                </div>

                            </div>

                            {/* RELATED */}

                            <div className="
rounded-[34px]
border border-slate-200
bg-white
p-8
">

                                <h2 className="
text-2xl
font-black
text-slate-900
">
                                    محصولات مرتبط
                                </h2>

                                <div className="
mt-8
grid
gap-6
md:grid-cols-3
">

                                    {related.map((item) => (

                                        <div
                                            key={item.title}
                                            className="
overflow-hidden
rounded-3xl
border border-slate-200
"
                                        >

                                            <div className="
relative
h-[220px]
bg-slate-100
">

                                                <Image
                                                    src={item.image}
                                                    alt=""
                                                    fill
                                                    className="object-cover"
                                                />

                                            </div>

                                            <div className="p-5">

                                                <h4 className="
text-sm
font-bold
text-slate-900
">
                                                    {item.title}
                                                </h4>

                                                <p className="
mt-4
font-black
text-blue-600
">
                                                    {item.price}
                                                </p>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}

                        <aside className="
sticky
top-28
h-fit
space-y-6
">

                            <div className="
rounded-[34px]
border border-slate-200
bg-white
p-8
">

                                <div className="
flex
flex-wrap
gap-3
">

                                    <Badge>SKF</Badge>
                                    <Badge>بلبرینگ</Badge>
                                    <Badge>فروش عمده</Badge>

                                </div>

                                <h1 className="
mt-7
text-[32px]
font-black
leading-[1.45]
text-slate-900
">
                                    بلبرینگ SKF 6205
                                </h1>

                                <div className="
mt-8
flex
items-center
gap-3
">

                                    <CheckCircle2
                                        size={18}
                                        className="text-emerald-600"
                                    />

                                    <span className="
text-sm
text-emerald-700
">
                                        موجود در انبار
                                    </span>

                                </div>

                                {/* PRICE */}

                                <div className="
mt-10
rounded-3xl
bg-slate-50
p-6
">

                                    <p className="
text-sm
text-slate-500
">
                                        قیمت خرده
                                    </p>

                                    <h3 className="
mt-3
text-3xl
font-black
text-slate-900
">
                                        ۲,۴۵۰,۰۰۰ تومان
                                    </h3>

                                    <div className="
mt-6
space-y-4
border-t
border-slate-200
pt-6
">

                                        <Tier
                                            qty="۱-۱۰ عدد"
                                            price="۲,۴۵۰,۰۰۰"
                                        />

                                        <Tier
                                            qty="۱۰-۵۰ عدد"
                                            price="۲,۲۵۰,۰۰۰"
                                        />

                                        <Tier
                                            qty="۵۰+ عدد"
                                            price="تماس بگیرید"
                                        />

                                    </div>

                                </div>

                                {/* QTY */}

                                <div className="
mt-10
flex
items-center
justify-between
">

                                    <p className="
text-sm
font-medium
text-slate-700
">
                                        تعداد
                                    </p>

                                    <div className="
flex
items-center
gap-4
">

                                        <QtyBtn
                                            onClick={() => setQty(Math.max(1, qty - 1))}
                                        >
                                            <Minus size={15} />
                                        </QtyBtn>

                                        <div className="
w-[30px]
text-center
font-bold
">
                                            {qty}
                                        </div>

                                        <QtyBtn
                                            onClick={() => setQty(qty + 1)}
                                        >
                                            <Plus size={15} />
                                        </QtyBtn>

                                    </div>

                                </div>

                                <div className="
mt-10
space-y-4
">

                                    <button className="
w-full
rounded-2xl
bg-blue-600
py-4
font-medium
text-white
">
                                        افزودن به سبد خرید
                                    </button>

                                    <button className="
w-full
rounded-2xl
border border-slate-200
py-4
font-medium
">
                                        درخواست قیمت عمده
                                    </button>

                                </div>

                                <div className="
mt-8
grid
gap-4
">

                                    <Benefit
                                        icon={<ShieldCheck size={18} />}
                                        title="ضمانت اصالت"
                                    />

                                    <Benefit
                                        icon={<Truck size={18} />}
                                        title="ارسال سریع"
                                    />

                                    <Benefit
                                        icon={<Download size={18} />}
                                        title="دانلود دیتاشیت"
                                    />

                                </div>

                            </div>

                        </aside>

                    </div>

                </div>

            </main>

            <Footer />

        </>

    );

}

function Tab({
    children,
    active,
    onClick,
}: any) {

    return (

        <button
            onClick={onClick}
            className={`
px-8
py-5
text-sm
font-medium
transition
${active
                    ?
                    "border-b-2 border-blue-600 text-blue-700"
                    :
                    "text-slate-500"
                }
`}
        >
            {children}
        </button>

    );

}

function SpecRow({
    label,
    value,
}: any) {

    return (

        <div className="
flex
justify-between
rounded-2xl
bg-slate-50
px-6 py-5
">

            <span className="
text-sm
text-slate-500
">
                {label}
            </span>

            <span className="
font-semibold
text-slate-900
">
                {value}
            </span>

        </div>

    );

}

function Tier({
    qty,
    price,
}: any) {

    return (

        <div className="
flex
items-center
justify-between
text-sm
">

            <span className="text-slate-500">
                {qty}
            </span>

            <span className="
font-bold
text-slate-900
">
                {price}
            </span>

        </div>

    );

}

function Benefit({
    icon,
    title,
}: any) {

    return (

        <div className="
flex
items-center
gap-4
rounded-2xl
bg-slate-50
p-5
">

            <div className="
text-blue-600
">
                {icon}
            </div>

            <span className="
text-sm
font-medium
text-slate-800
">
                {title}
            </span>

        </div>

    );

}

function Badge({
    children,
}: any) {

    return (

        <div className="
rounded-full
bg-slate-100
px-4 py-2
text-xs
font-medium
text-slate-700
">
            {children}
        </div>

    );

}

function CircleBtn({
    children,
}: any) {

    return (

        <button className="
flex
h-11
w-11
items-center
justify-center
rounded-full
bg-white/90
backdrop-blur
">
            {children}
        </button>

    );

}

function QtyBtn({
    children,
    onClick,
}: any) {

    return (

        <button
            onClick={onClick}
            className="
flex
h-11
w-11
items-center
justify-center
rounded-xl
border border-slate-200
"
        >
            {children}
        </button>

    );

}

function InfoCard({
    title,
    text,
}: any) {

    return (

        <div className="
rounded-3xl
bg-slate-50
p-6
">

            <h4 className="
font-bold
text-slate-900
">
                {title}
            </h4>

            <p className="
mt-3
text-sm
leading-7
text-slate-600
">
                {text}
            </p>

        </div>

    );

}