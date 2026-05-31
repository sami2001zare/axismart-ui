// src/app/admin/customers/page.tsx

"use client";

import {
    Search,
    UserPlus,
    Mail,
    Phone,
    MoreHorizontal,
    Building2,
} from "lucide-react";

const customers = [
    {
        id: "CUS-2041",
        name: "پارس صنعت",
        email: "info@pars.com",
        phone: "09121234567",
        orders: 18,
        spent: "۸۲,۰۰۰,۰۰۰",
        status: "active",
    },

    {
        id: "CUS-2042",
        name: "آریا ماشین",
        email: "sales@aria.com",
        phone: "09121111111",
        orders: 9,
        spent: "۳۱,۰۰۰,۰۰۰",
        status: "pending",
    },

    {
        id: "CUS-2043",
        name: "توان صنعت",
        email: "support@tavan.com",
        phone: "09123333333",
        orders: 26,
        spent: "۱۲۴,۰۰۰,۰۰۰",
        status: "vip",
    },

];

export default function CustomersPage() {

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

                <div>

                    <h1 className="
text-4xl
font-black
text-slate-900
">
                        مدیریت مشتریان
                    </h1>

                    <p className="
mt-3
text-sm
leading-7
text-slate-500
">
                        مدیریت مشتریان، شرکت‌ها و حساب‌های سازمانی.
                    </p>

                </div>

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

                    <UserPlus size={16} />

                    مشتری جدید

                </button>

            </div>

            {/* TOOLBAR */}

            <div className="
rounded-[34px]
border border-slate-200
bg-white
p-6
">

                <div className="
flex
flex-col
gap-5
xl:flex-row
xl:items-center
xl:justify-between
">

                    <div className="
flex
items-center
gap-4
rounded-2xl
border border-slate-200
bg-slate-50
px-5 py-4
">

                        <Search
                            size={18}
                            className="text-slate-400"
                        />

                        <input
                            placeholder="جستجوی مشتری، ایمیل، شرکت..."
                            className="
w-[360px]
bg-transparent
text-sm
outline-none
"
                        />

                    </div>

                    <div className="
flex
flex-wrap
gap-4
">

                        <MiniStat
                            title="کل مشتریان"
                            value="4,921"
                        />

                        <MiniStat
                            title="VIP"
                            value="284"
                        />

                    </div>

                </div>

            </div>

            {/* TABLE */}

            <div className="
overflow-hidden
rounded-[34px]
border border-slate-200
bg-white
">

                <div className="
flex
items-center
justify-between
border-b
border-slate-100
px-8 py-6
">

                    <h3 className="
text-lg
font-bold
text-slate-900
">
                        لیست مشتریان
                    </h3>

                    <button className="
rounded-xl
border border-slate-200
px-4 py-3
text-sm
font-medium
">
                        Bulk Actions
                    </button>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="
bg-slate-50
text-right
">

                            <tr>

                                <TH>
                                    مشتری
                                </TH>

                                <TH>
                                    تماس
                                </TH>

                                <TH>
                                    سفارشات
                                </TH>

                                <TH>
                                    خرید کل
                                </TH>

                                <TH>
                                    وضعیت
                                </TH>

                                <TH>
                                    عملیات
                                </TH>

                            </tr>

                        </thead>

                        <tbody>

                            {customers.map((item) => (

                                <tr
                                    key={item.id}
                                    className="
border-t
border-slate-100
transition
hover:bg-slate-50
"
                                >

                                    {/* CUSTOMER */}

                                    <td className="px-8 py-6">

                                        <div className="
flex
items-center
gap-5
">

                                            <div className="
flex
h-16
w-16
items-center
justify-center
rounded-3xl
bg-blue-50
text-blue-700
">

                                                <Building2 size={24} />

                                            </div>

                                            <div>

                                                <h4 className="
font-bold
text-slate-900
">
                                                    {item.name}
                                                </h4>

                                                <p className="
mt-2
text-xs
text-slate-500
">
                                                    {item.id}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    {/* CONTACT */}

                                    <td className="px-8 py-6">

                                        <div className="space-y-3">

                                            <Row
                                                icon={<Mail size={14} />}
                                                value={item.email}
                                            />

                                            <Row
                                                icon={<Phone size={14} />}
                                                value={item.phone}
                                            />

                                        </div>

                                    </td>

                                    {/* ORDERS */}

                                    <td className="
px-8
py-6
font-bold
text-slate-900
">

                                        {item.orders}

                                    </td>

                                    {/* SPENT */}

                                    <td className="
px-8
py-6
font-bold
">

                                        {item.spent}

                                    </td>

                                    {/* STATUS */}

                                    <td className="px-8 py-6">

                                        <StatusBadge
                                            status={item.status}
                                        />

                                    </td>

                                    {/* ACTIONS */}

                                    <td className="px-8 py-6">

                                        <div className="
flex
items-center
gap-3
">

                                            <button className="
rounded-xl
border border-slate-200
px-4 py-2
text-sm
font-medium
">
                                                مشاهده
                                            </button>

                                            <button className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
border border-slate-200
">

                                                <MoreHorizontal size={16} />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

function TH({
    children,
}: any) {

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

function MiniStat({
    title,
    value,
}: any) {

    return (

        <div className="
rounded-2xl
border border-slate-200
px-5 py-4
">

            <p className="
text-xs
text-slate-500
">
                {title}
            </p>

            <p className="
mt-2
font-black
text-slate-900
">
                {value}
            </p>

        </div>

    );

}

function StatusBadge({
    status,
}: any) {

    const styles = {

        active:
            "bg-blue-50 text-blue-700",

        pending:
            "bg-amber-50 text-amber-700",

        vip:
            "bg-emerald-50 text-emerald-700",

    };

    const labels = {

        active: "فعال",

        pending: "در انتظار",

        vip: "VIP",

    };

    return (

        <div className={`
inline-flex
rounded-full
px-4 py-2
text-xs
font-medium
${styles[status as keyof typeof styles]}
`}>

            {labels[status as keyof typeof labels]}

        </div>

    );

}