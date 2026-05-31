// src/app/admin/page.tsx

import {
    Package,
    ShoppingCart,
    Users,
    DollarSign,
    ArrowUpRight,
    AlertTriangle,
} from "lucide-react";

export default function AdminDashboard() {

    return (

        <div className="space-y-8">

            {/* HERO */}

            <div>

                <h1 className="
text-4xl
font-black
text-slate-900
">
                    داشبورد مدیریت
                </h1>

                <p className="
mt-3
text-sm
leading-7
text-slate-500
">
                    نمای کلی عملکرد فروش،
                    موجودی و فعالیت فروشگاه.
                </p>

            </div>

            {/* STATS */}

            <div className="
grid
gap-6
xl:grid-cols-4
">

                <StatCard
                    title="درآمد"
                    value="۱۲۵M"
                    icon={<DollarSign size={18} />}
                />

                <StatCard
                    title="سفارشات"
                    value="842"
                    icon={<ShoppingCart size={18} />}
                />

                <StatCard
                    title="محصولات"
                    value="248"
                    icon={<Package size={18} />}
                />

                <StatCard
                    title="مشتریان"
                    value="4,921"
                    icon={<Users size={18} />}
                />

            </div>

            {/* GRID */}

            <div className="
grid
gap-8
xl:grid-cols-[1.3fr_420px]
">

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
                            آخرین سفارشات
                        </h3>

                        <button className="
text-sm
font-medium
text-blue-600
">
                            مشاهده همه
                        </button>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="
bg-slate-50
text-right
">

                                <tr>

                                    <Th>
                                        سفارش
                                    </Th>

                                    <Th>
                                        مشتری
                                    </Th>

                                    <Th>
                                        مبلغ
                                    </Th>

                                    <Th>
                                        وضعیت
                                    </Th>

                                </tr>

                            </thead>

                            <tbody>

                                <Row
                                    id="#AX2041"
                                    customer="شرکت پارس صنعت"
                                    amount="۸,۲۰۰,۰۰۰"
                                    status="پرداخت شده"
                                />

                                <Row
                                    id="#AX2042"
                                    customer="آریا ماشین"
                                    amount="۲,۱۰۰,۰۰۰"
                                    status="در انتظار"
                                />

                                <Row
                                    id="#AX2043"
                                    customer="توان صنعت"
                                    amount="۱۲,۴۰۰,۰۰۰"
                                    status="ارسال شد"
                                />

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="space-y-8">

                    {/* ALERTS */}

                    <div className="
rounded-[34px]
border border-slate-200
bg-white
p-7
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
bg-amber-50
text-amber-600
">

                                <AlertTriangle size={20} />

                            </div>

                            <div>

                                <h4 className="
font-bold
text-slate-900
">
                                    هشدار موجودی
                                </h4>

                                <p className="
mt-2
text-xs
text-slate-500
">
                                    ۵ محصول کم‌موجودی
                                </p>

                            </div>

                        </div>

                        <div className="
mt-8
space-y-4
">

                            <StockItem
                                name="SKF 6205"
                                qty="3"
                            />

                            <StockItem
                                name="BANDO A52"
                                qty="5"
                            />

                            <StockItem
                                name="Chain HD25"
                                qty="2"
                            />

                        </div>

                    </div>

                    {/* CHART */}

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

                            <h3 className="
font-bold
text-slate-900
">
                                فروش ماهانه
                            </h3>

                            <ArrowUpRight
                                size={18}
                                className="text-emerald-600"
                            />

                        </div>

                        <div className="
mt-8
flex
h-[260px]
items-end
justify-between
gap-4
">

                            {[35, 60, 42, 80, 65, 90, 72].map((h) => (
                                <div
                                    key={h}
                                    className="
flex-1
rounded-t-3xl
bg-blue-600/90
"
                                    style={{
                                        height: `${h}%`,
                                    }}
                                />
                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

function StatCard({
    title,
    value,
    icon,
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
text-blue-600
">

                    {icon}

                </div>

                <div className="
rounded-full
bg-emerald-50
px-3 py-2
text-xs
font-medium
text-emerald-700
">
                    +12%
                </div>

            </div>

            <p className="
mt-8
text-sm
text-slate-500
">
                {title}
            </p>

            <h2 className="
mt-3
text-3xl
font-black
text-slate-900
">
                {value}
            </h2>

        </div>

    );

}

function Th({
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

            <td className="px-8 py-6 text-slate-600">
                {customer}
            </td>

            <td className="px-8 py-6 font-semibold">
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

function StockItem({
    name,
    qty,
}: any) {

    return (

        <div className="
flex
items-center
justify-between
rounded-2xl
bg-slate-50
p-5
">

            <div>

                <h4 className="
text-sm
font-bold
text-slate-900
">
                    {name}
                </h4>

                <p className="
mt-2
text-xs
text-slate-500
">
                    Low Inventory
                </p>

            </div>

            <div className="
rounded-full
bg-red-50
px-4 py-2
text-xs
font-medium
text-red-600
">
                {qty} Qty
            </div>

        </div>

    );

}