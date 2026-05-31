// src/app/admin/analytics/page.tsx

"use client";

import {
    DollarSign,
    ShoppingCart,
    Users,
    TrendingUp,
    Download,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";

export default function AnalyticsPage() {

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
                        آنالیتیکس
                    </h1>

                    <p className="
mt-3
text-sm
leading-7
text-slate-500
">
                        تحلیل فروش، عملکرد فروشگاه و رفتار مشتریان.
                    </p>

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
px-5 py-4
text-sm
font-medium
">

                        <Calendar size={16} />

                        30 روز اخیر

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

                        Export

                    </button>

                </div>

            </div>

            {/* KPI */}

            <div className="
grid
gap-6
xl:grid-cols-4
">

                <StatCard
                    title="درآمد"
                    value="۱۲۵M"
                    change="+12%"
                    positive
                    icon={<DollarSign size={18} />}
                />

                <StatCard
                    title="سفارشات"
                    value="842"
                    change="+8%"
                    positive
                    icon={<ShoppingCart size={18} />}
                />

                <StatCard
                    title="مشتریان"
                    value="4,921"
                    change="+21%"
                    positive
                    icon={<Users size={18} />}
                />

                <StatCard
                    title="Conversion"
                    value="3.2%"
                    change="-2%"
                    icon={<TrendingUp size={18} />}
                />

            </div>

            {/* GRID */}

            <div className="
grid
gap-8
xl:grid-cols-[1.5fr_420px]
">

                {/* SALES */}

                <div className="
rounded-[34px]
border border-slate-200
bg-white
p-8
">

                    <div className="
flex
items-center
justify-between
">

                        <div>

                            <h3 className="
text-xl
font-bold
text-slate-900
">
                                روند فروش
                            </h3>

                            <p className="
mt-2
text-sm
text-slate-500
">
                                عملکرد ۶ ماه اخیر
                            </p>

                        </div>

                        <div className="
rounded-full
bg-emerald-50
px-4 py-2
text-xs
font-medium
text-emerald-700
">
                            +18%
                        </div>

                    </div>

                    <div className="
mt-12
flex
h-[340px]
items-end
justify-between
gap-5
">

                        {[
                            40,
                            62,
                            48,
                            85,
                            70,
                            92,
                        ].map((h) => (

                            <div
                                key={h}
                                className="flex flex-1 flex-col items-center gap-4"
                            >

                                <div
                                    className="
w-full
rounded-t-[24px]
bg-blue-600
transition
hover:bg-blue-700
"
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

                {/* RIGHT */}

                <div className="space-y-8">

                    {/* TOP PRODUCTS */}

                    <div className="
rounded-[34px]
border border-slate-200
bg-white
p-7
">

                        <h3 className="
text-lg
font-bold
text-slate-900
">
                            محصولات برتر
                        </h3>

                        <div className="
mt-8
space-y-5
">

                            <ProductRow
                                name="بلبرینگ SKF 6205"
                                sales="182"
                            />

                            <ProductRow
                                name="تسمه BANDO A52"
                                sales="145"
                            />

                            <ProductRow
                                name="پولی HTD"
                                sales="93"
                            />

                        </div>

                    </div>

                    {/* CHANNELS */}

                    <div className="
rounded-[34px]
border border-slate-200
bg-white
p-7
">

                        <h3 className="
text-lg
font-bold
text-slate-900
">
                            کانال فروش
                        </h3>

                        <div className="
mt-8
space-y-6
">

                            <Channel
                                name="Retail"
                                percent="65%"
                                width="65%"
                            />

                            <Channel
                                name="Wholesale"
                                percent="35%"
                                width="35%"
                            />

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

function ProductRow({
    name,
    sales,
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
                    Top Performer
                </p>

            </div>

            <div className="
rounded-full
bg-blue-50
px-4 py-2
text-xs
font-medium
text-blue-700
">

                {sales} Sales

            </div>

        </div>

    );

}

function Channel({
    name,
    percent,
    width,
}: any) {

    return (

        <div>

            <div className="
mb-4
flex
items-center
justify-between
">

                <h4 className="
text-sm
font-bold
text-slate-900
">
                    {name}
                </h4>

                <p className="
text-sm
font-medium
text-slate-500
">
                    {percent}
                </p>

            </div>

            <div className="
h-4
overflow-hidden
rounded-full
bg-slate-100
">

                <div
                    className="
h-full
rounded-full
bg-blue-600
"
                    style={{
                        width,
                    }}
                />

            </div>

        </div>

    );

}