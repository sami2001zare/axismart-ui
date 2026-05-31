// src/app/customer/layout.tsx

"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    ShoppingBag,
    Heart,
    MapPin,
    User,
    Shield,
    Bell,
    Receipt,
    LogOut,
    Search,
    ChevronDown,
} from "lucide-react";

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (

        <div className="
min-h-screen
bg-slate-50
">

            <div className="
grid
min-h-screen
xl:grid-cols-[320px_1fr]
">

                {/* SIDEBAR */}

                <aside className="
border-l
border-slate-200
bg-white
p-6
">

                    <div className="
flex
items-center
justify-between
">

                        <h2 className="
text-2xl
font-black
text-slate-900
">
                            AxisMart
                        </h2>

                        <div className="
rounded-xl
bg-blue-50
px-3 py-2
text-xs
font-bold
text-blue-700
">
                            Customer
                        </div>

                    </div>

                    <div className="
mt-10
space-y-2
">

                        <NavItem
                            href="/customer"
                            icon={<LayoutDashboard size={18} />}
                            label="داشبورد"
                        />

                        <NavItem
                            href="/customer/orders"
                            icon={<ShoppingBag size={18} />}
                            label="سفارشات"
                        />

                        <NavItem
                            href="/customer/wishlist"
                            icon={<Heart size={18} />}
                            label="علاقه‌مندی‌ها"
                        />

                        <NavItem
                            href="/customer/addresses"
                            icon={<MapPin size={18} />}
                            label="آدرس‌ها"
                        />

                        <NavItem
                            href="/customer/profile"
                            icon={<User size={18} />}
                            label="پروفایل"
                        />

                        <NavItem
                            href="/customer/security"
                            icon={<Shield size={18} />}
                            label="امنیت"
                        />

                        <NavItem
                            href="/customer/notifications"
                            icon={<Bell size={18} />}
                            label="اعلان‌ها"
                        />

                        <NavItem
                            href="/customer/invoices"
                            icon={<Receipt size={18} />}
                            label="فاکتورها"
                        />

                    </div>

                    <div className="
mt-16
rounded-[28px]
bg-slate-900
p-6
text-white
">

                        <p className="
text-xs
text-slate-400
">
                            AxisMart PRO
                        </p>

                        <h3 className="
mt-4
text-xl
font-black
">
                            Wholesale Access
                        </h3>

                        <p className="
mt-4
text-sm
leading-7
text-slate-400
">
                            دسترسی ویژه سفارشات عمده،
                            قیمت سازمانی و تخفیف اختصاصی.
                        </p>

                        <button className="
mt-8
w-full
rounded-2xl
bg-white
px-5 py-4
text-sm
font-bold
text-slate-900
">
                            ارتقاء حساب
                        </button>

                    </div>

                    <button className="
mt-8
flex
w-full
items-center
gap-4
rounded-2xl
border border-slate-200
px-5 py-4
text-sm
font-medium
text-slate-700
">

                        <LogOut size={16} />

                        خروج

                    </button>

                </aside>

                {/* CONTENT */}

                <div>

                    {/* HEADER */}

                    <header className="
sticky
top-0
z-40
border-b
border-slate-200
bg-white/90
backdrop-blur-xl
">

                        <div className="
flex
flex-col
gap-5
px-8
py-6
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
                                    placeholder="جستجو..."
                                    className="
w-[340px]
bg-transparent
text-sm
outline-none
"
                                />

                            </div>

                            <div className="
flex
items-center
gap-5
">

                                <div className="
text-left
">

                                    <p className="
text-sm
font-bold
text-slate-900
">
                                        سامان زارع
                                    </p>

                                    <p className="
mt-2
text-xs
text-slate-500
">
                                        Wholesale Customer
                                    </p>

                                </div>

                                <button className="
flex
items-center
gap-3
rounded-2xl
border border-slate-200
px-4 py-3
">

                                    <div className="
h-11
w-11
rounded-xl
bg-blue-600
"/>

                                    <ChevronDown size={16} />

                                </button>

                            </div>

                        </div>

                    </header>

                    <main className="
p-8
">

                        {children}

                    </main>

                </div>

            </div>

        </div>

    );

}

function NavItem({
    href,
    icon,
    label,
}: any) {

    return (

        <Link
            href={href}
            className="
flex
items-center
gap-4
rounded-2xl
px-5 py-4
text-sm
font-medium
text-slate-700
transition
hover:bg-blue-600
hover:text-white
"
        >

            {icon}

            {label}

        </Link>

    );

}