// src/app/admin/products/page.tsx

"use client";

import Link from "next/link";
import {
    Search,
    Plus,
    Filter,
    MoreHorizontal,
    Package,
    ChevronDown,
} from "lucide-react";

const products = [
    {
        id: "AX-6205",
        name: "بلبرینگ SKF 6205",
        category: "بلبرینگ",
        stock: 42,
        price: "۲,۴۵۰,۰۰۰",
        status: "active",
        brand: "SKF",
    },

    {
        id: "AX-B52",
        name: "تسمه BANDO A52",
        category: "تسمه",
        stock: 7,
        price: "۱,۱۵۰,۰۰۰",
        status: "low",
        brand: "BANDO",
    },

    {
        id: "AX-HD25",
        name: "زنجیر HD25",
        category: "زنجیر",
        stock: 0,
        price: "۳,۲۰۰,۰۰۰",
        status: "out",
        brand: "AxisMart",
    },

    {
        id: "AX-HTD8M",
        name: "پولی HTD 8M",
        category: "پولی",
        stock: 18,
        price: "۸۹۰,۰۰۰",
        status: "active",
        brand: "SKF",
    },
];

export default function AdminProductsPage() {

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
                        مدیریت محصولات
                    </h1>

                    <p className="
mt-3
text-sm
leading-7
text-slate-500
">
                        مدیریت موجودی، دسته‌بندی،
                        قیمت و وضعیت محصولات.
                    </p>

                </div>

                <Link
                    href="/admin/products/create"
                    className="
inline-flex
items-center
gap-3
rounded-2xl
bg-blue-600
px-6 py-4
text-sm
font-medium
text-white
transition
hover:bg-blue-700
"
                >

                    <Plus size={18} />

                    محصول جدید

                </Link>

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

                    {/* LEFT */}

                    <div className="
flex
flex-col
gap-4
lg:flex-row
lg:items-center
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
                                placeholder="جستجوی محصول..."
                                className="
w-[320px]
bg-transparent
text-sm
outline-none
"
                            />

                        </div>

                        <button className="
inline-flex
items-center
gap-3
rounded-2xl
border border-slate-200
px-5 py-4
text-sm
font-medium
text-slate-700
">

                            <Filter size={16} />

                            فیلترها

                        </button>

                    </div>

                    {/* RIGHT */}

                    <div className="
flex
flex-wrap
gap-4
">

                        <SelectBtn>
                            همه دسته‌بندی‌ها
                        </SelectBtn>

                        <SelectBtn>
                            همه وضعیت‌ها
                        </SelectBtn>

                        <SelectBtn>
                            برند
                        </SelectBtn>

                    </div>

                </div>

            </div>

            {/* STATS */}

            <div className="
grid
gap-6
xl:grid-cols-4
">

                <MiniStat
                    title="کل محصولات"
                    value="248"
                />

                <MiniStat
                    title="فعال"
                    value="198"
                />

                <MiniStat
                    title="کم‌موجودی"
                    value="31"
                />

                <MiniStat
                    title="ناموجود"
                    value="19"
                />

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

                    <div className="
flex
items-center
gap-4
">

                        <input
                            type="checkbox"
                            className="h-5 w-5"
                        />

                        <p className="
text-sm
font-medium
text-slate-500
">
                            Bulk Select
                        </p>

                    </div>

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
                                </TH>

                                <TH>
                                    محصول
                                </TH>

                                <TH>
                                    دسته
                                </TH>

                                <TH>
                                    برند
                                </TH>

                                <TH>
                                    موجودی
                                </TH>

                                <TH>
                                    قیمت
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

                            {products.map((item) => (

                                <tr
                                    key={item.id}
                                    className="
border-t
border-slate-100
transition
hover:bg-slate-50
"
                                >

                                    <td className="px-8 py-6">

                                        <input
                                            type="checkbox"
                                            className="h-5 w-5"
                                        />

                                    </td>

                                    <td className="px-8 py-6">

                                        <div className="
flex
items-center
gap-5
">

                                            <div className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-blue-50
text-blue-600
">

                                                <Package size={22} />

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

                                    <td className="
px-8
py-6
text-sm
text-slate-600
">

                                        {item.category}

                                    </td>

                                    <td className="
px-8
py-6
font-medium
">

                                        {item.brand}

                                    </td>

                                    <td className="px-8 py-6">

                                        <InventoryBadge
                                            stock={item.stock}
                                        />

                                    </td>

                                    <td className="
px-8
py-6
font-bold
">

                                        {item.price}

                                    </td>

                                    <td className="px-8 py-6">

                                        <StatusBadge
                                            status={item.status}
                                        />

                                    </td>

                                    <td className="px-8 py-6">

                                        <div className="
flex
items-center
gap-3
">

                                            <Link
                                                href={`/admin/products/${item.id}/edit`}
                                                className="
rounded-xl
border border-slate-200
px-4 py-2
text-sm
font-medium
"
                                            >

                                                ویرایش

                                            </Link>

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

function SelectBtn({
    children,
}: any) {

    return (

        <button className="
inline-flex
items-center
gap-3
rounded-2xl
border border-slate-200
bg-white
px-5 py-4
text-sm
font-medium
text-slate-700
">

            {children}

            <ChevronDown size={16} />

        </button>

    );

}

function MiniStat({
    title,
    value,
}: any) {

    return (

        <div className="
rounded-[28px]
border border-slate-200
bg-white
p-6
">

            <p className="
text-sm
text-slate-500
">
                {title}
            </p>

            <h3 className="
mt-4
text-3xl
font-black
text-slate-900
">
                {value}
            </h3>

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

function StatusBadge({
    status,
}: any) {

    const styles = {

        active:
            "bg-emerald-50 text-emerald-700",

        low:
            "bg-amber-50 text-amber-700",

        out:
            "bg-red-50 text-red-700",

    };

    const labels = {

        active: "فعال",

        low: "کم‌موجودی",

        out: "ناموجود",

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

function InventoryBadge({
    stock,
}: any) {

    return (

        <div className={`
inline-flex
rounded-full
px-4 py-2
text-xs
font-medium
${stock === 0
                ?
                "bg-red-50 text-red-700"
                :
                stock < 10
                    ?
                    "bg-amber-50 text-amber-700"
                    :
                    "bg-blue-50 text-blue-700"
            }
`}>

            {stock} Qty

        </div>

    );

}