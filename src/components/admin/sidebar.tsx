"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    FolderTree,
    BarChart3,
    Settings,
    ChevronLeft,
    Tag,
} from "lucide-react";
import useUiStore from "@/store/uiStore";

const items = [
    { title: "داشبورد", href: "/admin", icon: LayoutDashboard },
    { title: "برندها", href: "/admin/brands", icon: Tag },
    { title: "محصولات", href: "/admin/products", icon: Package },
    { title: "سفارشات", href: "/admin/orders", icon: ShoppingCart },
    { title: "مشتریان", href: "/admin/customers", icon: Users },
    { title: "دسته‌بندی‌ها", href: "/admin/categories", icon: FolderTree },
    { title: "آنالیتیکس", href: "/admin/analytics", icon: BarChart3 },
    // { title: "تنظیمات", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { sidebarExpanded, toggleSidebar } = useUiStore();

    return (
        <aside
            className={`flex flex-col border-l border-slate-200 bg-white transition-all duration-300 ${sidebarExpanded ? "w-[290px]" : "w-[80px]"
                }`}
        >
            {/* HEADER */}
            <div
                className={`flex h-[88px] items-center justify-between border-b border-slate-200 px-5 ${sidebarExpanded ? "justify-between" : "justify-center"
                    }`}
            >
                {sidebarExpanded && (
                    <h2 className="text-xl font-black text-slate-900">بلبرینگ پارسا</h2>
                )}
                <button
                    onClick={toggleSidebar}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition-transform duration-300"
                    style={{ transform: sidebarExpanded ? "rotate(0deg)" : "rotate(180deg)" }}
                >
                    <ChevronLeft size={16} />
                </button>
            </div>

            {/* MENU */}
            <nav className="flex-1 space-y-2 p-3">
                {items.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-medium transition ${active
                                ? "bg-blue-600 text-white"
                                : "text-slate-600 hover:bg-slate-100"
                                } ${sidebarExpanded ? "justify-start" : "justify-center"}`}
                        >
                            <Icon size={20} />
                            {sidebarExpanded && <span>{item.title}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* FOOTER */}
            {/* {sidebarExpanded && (
                <div className="border-t border-slate-200 p-5">
                    <div className="rounded-3xl bg-slate-50 p-5">
                        <p className="text-xs uppercase tracking-[2px] text-slate-400">
                            System
                        </p>
                        <h4 className="mt-3 font-bold text-slate-900">
                            AxisMart Enterprise
                        </h4>
                        <p className="mt-3 text-xs leading-6 text-slate-500">
                            Industrial Commerce Management Platform
                        </p>
                    </div>
                </div>
            )} */}
        </aside>
    );
}