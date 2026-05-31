// src/app/admin/orders/[id]/page.tsx

"use client";

import {
    ArrowRight,
    Printer,
    Download,
    Truck,
    CheckCircle2,
    Clock3,
    User,
    MapPin,
    Package,
} from "lucide-react";

export default function OrderDetailsPage() {

    return (

        <div className="space-y-8">

            {/* HEADER */}

            <div className="
flex
flex-col
gap-6
xl:flex-row
xl:items-center
xl:justify-between
">

                <div className="
flex
items-center
gap-5
">

                    <button className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
border border-slate-200
bg-white
">

                        <ArrowRight size={18} />

                    </button>

                    <div>

                        <h1 className="
text-4xl
font-black
text-slate-900
">
                            سفارش #AX2041
                        </h1>

                        <p className="
mt-3
text-sm
text-slate-500
">
                            ثبت شده در 2026/05/31
                        </p>

                    </div>

                </div>

                <div className="
flex
gap-4
flex-wrap
">

                    <button className="
inline-flex
items-center
gap-3
rounded-2xl
border border-slate-200
bg-white
px-6 py-4
text-sm
font-medium
">

                        <Printer size={16} />

                        پرینت

                    </button>

                    <button className="
inline-flex
items-center
gap-3
rounded-2xl
bg-blue-600
px-6 py-4
text-sm
font-medium
text-white
">

                        <Download size={16} />

                        دانلود فاکتور

                    </button>

                </div>

            </div>

            <div className="
grid
gap-8
xl:grid-cols-[1.4fr_420px]
">

                {/* LEFT */}

                <div className="space-y-8">

                    {/* ITEMS */}

                    <div className="
overflow-hidden
rounded-[34px]
border border-slate-200
bg-white
">

                        <div className="
border-b
border-slate-100
px-8 py-6
">

                            <h3 className="
text-lg
font-bold
text-slate-900
">
                                آیتم‌های سفارش
                            </h3>

                        </div>

                        <table className="w-full">

                            <thead className="
bg-slate-50
text-right
">

                                <tr>

                                    <TH>محصول</TH>
                                    <TH>تعداد</TH>
                                    <TH>قیمت</TH>
                                    <TH>جمع</TH>

                                </tr>

                            </thead>

                            <tbody>

                                <ItemRow
                                    name="بلبرینگ SKF 6205"
                                    qty="5"
                                    price="۲,۴۵۰,۰۰۰"
                                    total="۱۲,۲۵۰,۰۰۰"
                                />

                                <ItemRow
                                    name="تسمه BANDO A52"
                                    qty="2"
                                    price="۱,۱۵۰,۰۰۰"
                                    total="۲,۳۰۰,۰۰۰"
                                />

                            </tbody>

                        </table>

                    </div>

                    {/* TIMELINE */}

                    <div className="
rounded-[34px]
border border-slate-200
bg-white
p-8
">

                        <h3 className="
text-lg
font-bold
text-slate-900
">
                            Timeline
                        </h3>

                        <div className="
mt-8
space-y-7
">

                            <TimelineItem
                                icon={<CheckCircle2 size={18} />}
                                title="پرداخت موفق"
                                time="10:35"
                            />

                            <TimelineItem
                                icon={<Package size={18} />}
                                title="آماده‌سازی سفارش"
                                time="11:20"
                            />

                            <TimelineItem
                                icon={<Truck size={18} />}
                                title="ارسال سفارش"
                                time="13:50"
                            />

                        </div>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="space-y-8">

                    {/* STATUS */}

                    <Card>

                        <div className="
flex
items-center
justify-between
">

                            <h3 className="
font-bold
text-slate-900
">
                                وضعیت سفارش
                            </h3>

                            <div className="
rounded-full
bg-emerald-50
px-4 py-2
text-xs
font-medium
text-emerald-700
">
                                پرداخت شده
                            </div>

                        </div>

                        <div className="
mt-8
space-y-4
">

                            <StatusRow
                                label="پرداخت"
                                value="Completed"
                            />

                            <StatusRow
                                label="ارسال"
                                value="Shipped"
                            />

                            <StatusRow
                                label="Tracking"
                                value="TRK-982341"
                            />

                        </div>

                    </Card>

                    {/* CUSTOMER */}

                    <Card>

                        <div className="
flex
items-center
gap-4
">

                            <div className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-blue-50
text-blue-700
">

                                <User size={22} />

                            </div>

                            <div>

                                <h3 className="
font-bold
text-slate-900
">
                                    پارس صنعت
                                </h3>

                                <p className="
mt-2
text-xs
text-slate-500
">
                                    info@pars.com
                                </p>

                            </div>

                        </div>

                        <div className="
mt-8
space-y-4
">

                            <Row
                                icon={<MapPin size={15} />}
                                value="تهران، خیابان آزادی"
                            />

                            <Row
                                icon={<Clock3 size={15} />}
                                value="Customer Since 2024"
                            />

                        </div>

                    </Card>

                    {/* TOTAL */}

                    <Card>

                        <h3 className="
font-bold
text-slate-900
">
                            خلاصه مالی
                        </h3>

                        <div className="
mt-8
space-y-5
">

                            <Money
                                label="Subtotal"
                                value="۱۴,۵۵۰,۰۰۰"
                            />

                            <Money
                                label="Shipping"
                                value="۳۰۰,۰۰۰"
                            />

                            <Money
                                label="Tax"
                                value="۹۰۰,۰۰۰"
                            />

                            <div className="
border-t
border-slate-100
pt-5
">

                                <Money
                                    label="Total"
                                    value="۱۵,۷۵۰,۰۰۰"
                                    bold
                                />

                            </div>

                        </div>

                    </Card>

                </div>

            </div>

        </div>

    );

}

function Card({
    children,
}: any) {

    return (

        <div className="
rounded-[34px]
border border-slate-200
bg-white
p-7
">

            {children}

        </div>

    );

}

function TH({ children }: any) {

    return (

        <th className="
px-8
py-5
text-sm
font-bold
text-slate-700
">
            {children}
        </th>

    );

}

function ItemRow({
    name,
    qty,
    price,
    total,
}: any) {

    return (

        <tr className="
border-t
border-slate-100
">

            <td className="px-8 py-6 font-bold">
                {name}
            </td>

            <td className="px-8 py-6">
                {qty}
            </td>

            <td className="px-8 py-6">
                {price}
            </td>

            <td className="
px-8
py-6
font-bold
text-slate-900
">
                {total}
            </td>

        </tr>

    );

}

function TimelineItem({
    icon,
    title,
    time,
}: any) {

    return (

        <div className="
flex
items-center
justify-between
">

            <div className="
flex
items-center
gap-4
">

                <div className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-blue-50
text-blue-700
">

                    {icon}

                </div>

                <div>

                    <h4 className="
font-bold
text-slate-900
">
                        {title}
                    </h4>

                    <p className="
mt-2
text-xs
text-slate-500
">
                        Order Event
                    </p>

                </div>

            </div>

            <p className="
text-sm
font-medium
text-slate-500
">
                {time}
            </p>

        </div>

    );

}

function StatusRow({
    label,
    value,
}: any) {

    return (

        <div className="
flex
items-center
justify-between
rounded-2xl
bg-slate-50
p-4
">

            <p className="
text-sm
text-slate-500
">
                {label}
            </p>

            <p className="
font-bold
text-slate-900
">
                {value}
            </p>

        </div>

    );

}

function Row({
    icon,
    value,
}: any) {

    return (

        <div className="
flex
items-center
gap-3
text-sm
text-slate-600
">

            {icon}

            {value}

        </div>

    );

}

function Money({
    label,
    value,
    bold,
}: any) {

    return (

        <div className="
flex
items-center
justify-between
">

            <p className="
text-sm
text-slate-500
">
                {label}
            </p>

            <p className={`
${bold ? "text-xl font-black" : "font-bold"}
text-slate-900
`}>

                {value}

            </p>

        </div>

    );

}