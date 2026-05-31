// src/app/admin/categories/page.tsx

"use client";

import {
    Search,
    Plus,
    FolderTree,
    ChevronRight,
    MoreHorizontal,
    Package,
} from "lucide-react";

const categories = [
    {
        id: "CAT-01",
        name: "بلبرینگ",
        products: 248,
        children: 4,
        status: "active",
    },

    {
        id: "CAT-02",
        name: "تسمه صنعتی",
        products: 136,
        children: 6,
        status: "active",
    },

    {
        id: "CAT-03",
        name: "پولی",
        products: 92,
        children: 3,
        status: "draft",
    },

    {
        id: "CAT-04",
        name: "زنجیر صنعتی",
        products: 74,
        children: 2,
        status: "active",
    },
];

export default function CategoriesPage() {

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
                        مدیریت دسته‌بندی‌ها
                    </h1>

                    <p className="
mt-3
text-sm
leading-7
text-slate-500
">
                        ساختار دسته‌بندی، زیردسته‌ها و مدیریت کاتالوگ.
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

                    <Plus size={16} />

                    دسته‌بندی جدید

                </button>

            </div>

            {/* SEARCH */}

            <div className="
rounded-[34px]
border border-slate-200
bg-white
p-6
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
                        placeholder="جستجوی دسته‌بندی..."
                        className="
w-full
bg-transparent
outline-none
text-sm
"
                    />

                </div>

            </div>

            {/* TREE TABLE */}

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
                        ساختار دسته‌بندی‌ها
                    </h3>

                    <div className="
rounded-full
bg-slate-100
px-4 py-2
text-xs
font-medium
">
                        18 Category
                    </div>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="
bg-slate-50
text-right
">

                            <tr>

                                <TH>
                                    دسته‌بندی
                                </TH>

                                <TH>
                                    محصولات
                                </TH>

                                <TH>
                                    زیرشاخه
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

                            {categories.map((item) => (

                                <tr
                                    key={item.id}
                                    className="
border-t
border-slate-100
transition
hover:bg-slate-50
"
                                >

                                    {/* CATEGORY */}

                                    <td className="px-8 py-6">

                                        <div className="
flex
items-center
gap-5
">

                                            <button className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
border border-slate-200
">

                                                <ChevronRight size={16} />

                                            </button>

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

                                                <FolderTree size={22} />

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

                                    {/* PRODUCTS */}

                                    <td className="px-8 py-6">

                                        <div className="
inline-flex
items-center
gap-3
rounded-full
bg-slate-100
px-4 py-2
text-sm
font-medium
">

                                            <Package size={14} />

                                            {item.products}

                                        </div>

                                    </td>

                                    {/* CHILDREN */}

                                    <td className="
px-8
py-6
font-bold
text-slate-900
">

                                        {item.children}

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
                                                ویرایش
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

function StatusBadge({
    status,
}: any) {

    const styles = {

        active:
            "bg-emerald-50 text-emerald-700",

        draft:
            "bg-amber-50 text-amber-700",

    };

    const labels = {

        active: "فعال",

        draft: "Draft",

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