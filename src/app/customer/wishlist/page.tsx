// src/app/customer/wishlist/page.tsx

"use client";

import {
    Heart,
    ShoppingCart,
    Trash2,
    Search,
    Filter,
} from "lucide-react";

const products = [
    {
        id: "P1",
        name: "بلبرینگ SKF 6205",
        price: "۲,۴۵۰,۰۰۰",
        stock: "موجود",
    },

    {
        id: "P2",
        name: "تسمه BANDO A52",
        price: "۱,۱۵۰,۰۰۰",
        stock: "کم‌موجودی",
    },

    {
        id: "P3",
        name: "پولی HTD 8M",
        price: "۸۹۰,۰۰۰",
        stock: "موجود",
    },
];

export default function WishlistPage() {

    return (

        <div className="space-y-8">

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
                        علاقه‌مندی‌ها
                    </h1>

                    <p className="
mt-3
text-sm
text-slate-500
">
                        محصولات ذخیره‌شده برای خرید آینده.
                    </p>

                </div>

                <div className="
rounded-2xl
bg-red-50
px-5 py-4
text-sm
font-bold
text-red-700
">

                    12 Product

                </div>

            </div>

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

                        <Search size={18} />

                        <input
                            placeholder="جستجوی محصول..."
                            className="
w-[320px]
bg-transparent
outline-none
text-sm
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
">

                        <Filter size={16} />

                        فیلتر

                    </button>

                </div>

            </div>

            <div className="
grid
gap-6
xl:grid-cols-3
">

                {products.map((item) => (

                    <div
                        key={item.id}
                        className="
overflow-hidden
rounded-[34px]
border border-slate-200
bg-white
transition
hover:-translate-y-1
"
                    >

                        <div className="
h-[220px]
bg-gradient-to-br
from-slate-100
to-slate-200
"/>

                        <div className="p-7">

                            <div className="
flex
items-start
justify-between
gap-4
">

                                <div>

                                    <h3 className="
text-xl
font-bold
leading-8
text-slate-900
">
                                        {item.name}
                                    </h3>

                                    <p className="
mt-4
text-2xl
font-black
text-slate-900
">
                                        {item.price}
                                    </p>

                                </div>

                                <button className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-red-50
text-red-600
">

                                    <Heart
                                        size={18}
                                        fill="currentColor"
                                    />

                                </button>

                            </div>

                            <div className="
mt-7
flex
items-center
justify-between
">

                                <div className="
rounded-full
bg-emerald-50
px-4 py-2
text-xs
font-medium
text-emerald-700
">

                                    {item.stock}

                                </div>

                                <div className="
flex
gap-3
">

                                    <button className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
border border-slate-200
">

                                        <Trash2 size={16} />

                                    </button>

                                    <button className="inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-medium text-white ">

                                        <ShoppingCart size={16} />

                                        افزودن

                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );

}