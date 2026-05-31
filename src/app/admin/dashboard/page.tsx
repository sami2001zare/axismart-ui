// src/app/admin/dashboard/page.tsx

"use client";

import { DollarSign, ShoppingBag, Users, Package, ArrowUpRight, ArrowDownRight, TrendingUp, Clock3, AlertTriangle, } from "lucide-react";

export default function AdminDashboardPage() {

    return (

        <div className="space-y-8">

            {/* HERO */}

            <div className=" rounded-[40px] border border-slate-200 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-10 text-white overflow-hidden relative ">

                <div className=" absolute left-[-100px] top-[-100px] h-[260px] w-[260px] rounded-full bg-white/10 blur-3xl " />

                <div className=" relative z-10 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between ">

                    <div>

                        <p className=" text-sm font-medium text-blue-100 ">
                            AxisMart Admin Center
                        </p>

                        <h1 className=" mt-5 text-5xl font-black leading-tight ">
                            داشبورد مدیریت
                        </h1>

                        <p className=" mt-6 max-w-2xl text-sm leading-8 text-blue-100 ">
                            نمای کلی فروشگاه، فروش، سفارشات،
                            موجودی و عملکرد تجاری.
                        </p>

                    </div>

                    <div className=" grid gap-4 sm:grid-cols-2 ">

                        <HeroStat
                            label="Revenue"
                            value="۱۲۵M"
                        />

                        <HeroStat
                            label="Orders"
                            value="842"
                        />

                        <HeroStat
                            label="Customers"
                            value="4,921"
                        />

                        <HeroStat
                            label="Products"
                            value="248"
                        />

                    </div>
                </div>
            </div>

            {/* KPI */}

            <div className=" grid gap-6 xl:grid-cols-4 ">

                <KPI
                    title="درآمد امروز"
                    value="۱۸,۲۰۰,۰۰۰"
                    change="+12%"
                    positive
                    icon={<DollarSign size={18} />}
                />

                <KPI
                    title="سفارشات"
                    value="124"
                    change="+6%"
                    positive
                    icon={<ShoppingBag size={18} />}
                />

                <KPI
                    title="کاربران جدید"
                    value="48"
                    change="-4%"
                    icon={<Users size={18} />}
                />

                <KPI
                    title="محصولات فعال"
                    value="248"
                    change="+3%"
                    positive
                    icon={<Package size={18} />}
                />

            </div>

            {/* MAIN GRID */}

            <div className=" grid gap-8 xl:grid-cols-[1.5fr_420px] ">

                {/* LEFT */}
                <div className="space-y-8">
                    {/* SALES */}
                    <div className=" rounded-[34px] border border-slate-200 bg-white p-8 ">

                        <div className=" flex items-center justify-between ">
                            <div>

                                <h3 className=" text-xl font-bold text-slate-900 ">
                                    عملکرد فروش
                                </h3>

                                <p className=" mt-2 text-sm text-slate-500 ">
                                    ۶ ماه اخیر
                                </p>

                            </div>

                            <div className=" rounded-full bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700 ">
                                +18%
                            </div>
                        </div>

                        <div className=" mt-12 flex h-[320px] items-end gap-5 ">

                            {[55, 82, 63, 95, 72, 88].map((h) => (

                                <div key={h} className=" flex flex-1 flex-col items-center gap-4 ">

                                    <div
                                        className=" w-full rounded-t-[26px] bg-gradient-to-t from-blue-700 to-blue-500 "
                                        style={{
                                            height: `${h}%`,
                                        }}
                                    />

                                    <p className="
text-xs
font-medium
text-slate-500
">
                                        ماه
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RECENT ORDERS */}

                    <div className=" overflow-hidden rounded-[34px] border border-slate-200 bg-white ">

                        <div className=" border-b border-slate-100 px-8 py-6 ">

                            <h3 className=" text-lg font-bold text-slate-900 ">
                                آخرین سفارشات
                            </h3>

                        </div>

                        <table className="w-full">
                            <thead className=" bg-slate-50 text-right ">
                                <tr>
                                    <TH>سفارش</TH>
                                    <TH>مشتری</TH>
                                    <TH>مبلغ</TH>
                                    <TH>وضعیت</TH>
                                </tr>
                            </thead>

                            <tbody>

                                <OrderRow
                                    id="#AX2041"
                                    customer="پارس صنعت"
                                    amount="۸,۲۰۰,۰۰۰"
                                    status="پرداخت شده"
                                />

                                <OrderRow
                                    id="#AX2042"
                                    customer="آریا ماشین"
                                    amount="۳,۹۰۰,۰۰۰"
                                    status="ارسال شد"
                                />

                                <OrderRow
                                    id="#AX2043"
                                    customer="توان صنعت"
                                    amount="۱۲,۱۰۰,۰۰۰"
                                    status="در انتظار"
                                />

                            </tbody>
                        </table>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="space-y-8">
                    {/* QUICK ACTIONS */}

                    <div className=" rounded-[34px] border border-slate-200 bg-white p-7 ">

                        <h3 className=" font-bold text-slate-900 ">
                            Quick Actions
                        </h3>

                        <div className=" mt-7 space-y-4 ">

                            <ActionBtn>
                                محصول جدید
                            </ActionBtn>

                            <ActionBtn>
                                سفارشات
                            </ActionBtn>

                            <ActionBtn>
                                مدیریت مشتریان
                            </ActionBtn>
                        </div>
                    </div>

                    {/* ALERTS */}

                    <div className=" rounded-[34px] border border-slate-200 bg-white p-7 ">

                        <h3 className=" font-bold text-slate-900 ">
                            هشدارها
                        </h3>

                        <div className=" mt-8 space-y-5 ">

                            <AlertItem
                                title="۷ محصول کم‌موجودی"
                                color="amber"
                            />

                            <AlertItem
                                title="۳ سفارش در انتظار تایید"
                                color="blue"
                            />

                            <AlertItem
                                title="۱ پرداخت ناموفق"
                                color="red"
                            />

                        </div>

                    </div>

                    {/* ACTIVITY */}

                    <div className=" rounded-[34px] border border-slate-200 bg-white p-7 ">

                        <h3 className=" font-bold text-slate-900 ">
                            فعالیت اخیر
                        </h3>

                        <div className="
mt-8
space-y-6
">

                            <Activity
                                icon={<Clock3 size={16} />}
                                title="محصول جدید اضافه شد"
                            />

                            <Activity
                                icon={<TrendingUp size={16} />}
                                title="فروش امروز افزایش یافت"
                            />

                            <Activity
                                icon={<Package size={16} />}
                                title="موجودی بروزرسانی شد"
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

function HeroStat({
    label,
    value,
}: any) {

    return (

        <div className="
rounded-3xl
border border-white/10
bg-white/10
backdrop-blur-xl
p-5
">

            <p className="
text-xs
text-blue-100
">
                {label}
            </p>

            <h3 className="
mt-3
text-2xl
font-black
">
                {value}
            </h3>

        </div>

    );

}

function KPI({
    title,
    value,
    change,
    icon,
    positive,
}: any) {

    return (

        <div className="
rounded-[34px]
border border-slate-200
bg-white
p-7
">

            <div className="
flex
items-center
justify-between
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

                <div className={`
inline-flex
items-center
gap-2
rounded-full
px-3 py-2
text-xs
font-medium
${positive
                        ?
                        "bg-emerald-50 text-emerald-700"
                        :
                        "bg-red-50 text-red-700"
                    }
`}>

                    {positive
                        ?
                        <ArrowUpRight size={13} />
                        :
                        <ArrowDownRight size={13} />
                    }

                    {change}

                </div>

            </div>

            <p className="
mt-8
text-sm
text-slate-500
">
                {title}
            </p>

            <h3 className="
mt-3
text-3xl
font-black
text-slate-900
">
                {value}
            </h3>

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

function OrderRow({
    id,
    customer,
    amount,
    status,
}: any) {

    return (

        <tr className="
border-t
border-slate-100
">

            <td className="px-8 py-6 font-bold">
                {id}
            </td>

            <td className="px-8 py-6">
                {customer}
            </td>

            <td className="px-8 py-6">
                {amount}
            </td>

            <td className="px-8 py-6">

                <div className="
inline-flex
rounded-full
bg-blue-50
px-4 py-2
text-xs
font-medium
text-blue-700
">
                    {status}
                </div>

            </td>

        </tr>

    );

}

function ActionBtn({
    children,
}: any) {

    return (

        <button className="
w-full
rounded-2xl
border border-slate-200
bg-slate-50
px-5 py-4
text-right
text-sm
font-medium
transition
hover:bg-blue-600
hover:text-white
">

            {children}

        </button>

    );

}

function AlertItem({
    title,
    color,
}: any) {

    const colors: any = {
        amber: "bg-amber-500",
        blue: "bg-blue-600",
        red: "bg-red-500",
    };

    return (

        <div className="
flex
items-center
gap-4
">

            <div className={`
h-3
w-3
rounded-full
${colors[color]}
`} />

            <p className="
text-sm
text-slate-700
">
                {title}
            </p>

        </div>

    );

}

function Activity({
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
p-4
">

            <div className="
flex
h-11
w-11
items-center
justify-center
rounded-2xl
bg-blue-50
text-blue-700
">

                {icon}

            </div>

            <p className="
text-sm
font-medium
text-slate-700
">
                {title}
            </p>

        </div>

    );

}