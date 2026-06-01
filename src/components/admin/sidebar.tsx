"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, FolderTree, BarChart3, Settings, ChevronLeft } from "lucide-react";

const items = [
    {
        title: "داشبورد",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "محصولات",
        href: "/admin/products",
        icon: Package,
    },
    {
        title: "سفارشات",
        href: "/admin/orders",
        icon: ShoppingCart,
    },
    {
        title: "مشتریان",
        href: "/admin/customers",
        icon: Users,
    },
    {
        title: "دسته‌بندی‌ها",
        href: "/admin/categories",
        icon: FolderTree,
    },
    {
        title: "آنالیتیکس",
        href: "/admin/analytics",
        icon: BarChart3,
    },
    {
        title: "تنظیمات",
        href: "/admin/settings",
        icon: Settings,
    },
];

export default function AdminSidebar() {

    const pathname = usePathname();

    return (
        <aside className=" hidden xl:flex xl:w-[290px] xl:flex-col xl:border-l xl:border-slate-200 xl:bg-white ">

            {/* HEADER */}
            <div className=" flex h-[88px] items-center justify-between border-b border-slate-200 px-7 ">
                <div>
                    <h2 className=" text-xl font-black text-slate-900 ">
                        AxisMart
                    </h2>

                    <p className=" mt-1 text-xs text-slate-500 ">
                        Admin Panel
                    </p>
                </div>

                <button className=" flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 ">
                    <ChevronLeft size={16} />
                </button>
            </div>

            {/* MENU */}
            <nav className=" flex-1 space-y-2 p-5 ">
                {items.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={` group flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-medium transition ${active ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                        >
                            <Icon size={18} />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>

            {/* FOOTER */}
            <div className=" border-t border-slate-200 p-5 ">
                <div className=" rounded-3xl bg-slate-50 p-5 ">
                    <p className=" text-xs uppercase tracking-[2px] text-slate-400 ">
                        System
                    </p>
                    <h4 className=" mt-3 font-bold text-slate-900 ">
                        AxisMart Enterprise
                    </h4>
                    <p className=" mt-3 text-xs leading-6 text-slate-500 ">
                        Industrial Commerce Management
                        Platform
                    </p>
                </div>
            </div>
        </aside>
    );
}