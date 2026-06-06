'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    MessageSquare,
    FileSpreadsheet,
    Menu,
} from 'lucide-react';
import { useCustomerUiStore } from '@/store/customerUiStore';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
    const { sidebarExpanded, toggleSidebar } = useCustomerUiStore();
    const pathname = usePathname();

    const navItems = [
        { href: '/customer', icon: LayoutDashboard, label: 'داشبورد' },
        { href: '/customer/orders', icon: ShoppingBag, label: 'سفارشات' },
        { href: '/customer/wishlist', icon: Heart, label: 'علاقه‌مندی‌ها' },
        { href: '/customer/addresses', icon: MapPin, label: 'آدرس‌ها' },
        { href: '/customer/profile', icon: User, label: 'پروفایل' },
        { href: '/customer/security', icon: Shield, label: 'امنیت' },
        { href: '/customer/notifications', icon: Bell, label: 'اعلان‌ها' },
        { href: '/customer/invoices', icon: Receipt, label: 'فاکتورها' },
        { href: '/customer/support', icon: MessageSquare, label: 'پشتیبانی' },
        { href: '/customer/quotes', icon: FileSpreadsheet, label: 'استعلام قیمت' },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="flex min-h-screen">
                {/* SIDEBAR */}
                <aside
                    className={`fixed top-0 right-0 z-50 flex h-screen flex-col border-l border-slate-200 bg-white transition-all duration-300 ${
                        sidebarExpanded ? 'w-[320px]' : 'w-[80px]'
                    }`}
                >
                    {/* Sidebar Header */}
                    <div
                        className={`flex h-20 items-center justify-between border-b border-slate-200 px-5 ${sidebarExpanded ? 'justify-between' : 'justify-center'}`}
                    >
                        {sidebarExpanded && (
                            <h2 className="text-2xl font-black text-slate-900">بلبرینگ پارسا</h2>
                        )}
                        <button
                            onClick={toggleSidebar}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 transition-transform duration-300"
                            style={{
                                transform: sidebarExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
                            }}
                        >
                            <ChevronDown size={16} className="rotate-90" />
                        </button>
                    </div>

                    {/* Sidebar Navigation */}
                    <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-6">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? 'bg-blue-600 text-white'
                                            : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                                    } ${sidebarExpanded ? 'justify-start' : 'justify-center'}`}
                                >
                                    <Icon size={18} />
                                    {sidebarExpanded && <span>{item.label}</span>}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Upgrade Card (only when expanded) */}
                    {/* {sidebarExpanded && (
                        <div className="mx-5 mb-6 rounded-[28px] bg-slate-900 p-6 text-white">
                            <p className="text-xs text-slate-400">AxisMart PRO</p>
                            <h3 className="mt-4 text-xl font-black">Wholesale Access</h3>
                            <p className="mt-4 text-sm leading-7 text-slate-400">
                                دسترسی ویژه سفارشات عمده، قیمت سازمانی و تخفیف اختصاصی.
                            </p>
                            <button className="mt-8 w-full rounded-2xl bg-white px-5 py-4 text-sm font-bold text-slate-900">
                                ارتقاء حساب
                            </button>
                        </div>
                    )} */}

                    {/* Logout Button */}
                    <div
                        className={`border-t border-slate-200 p-5 ${sidebarExpanded ? '' : 'flex justify-center'}`}
                    >
                        <button
                            className={`flex w-full items-center gap-4 rounded-2xl border border-slate-200 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-600 ${
                                sidebarExpanded ? 'justify-start' : 'justify-center'
                            }`}
                        >
                            <LogOut size={16} />
                            {sidebarExpanded && <span>خروج</span>}
                        </button>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <div
                    className="flex-1 transition-all duration-300"
                    style={{ marginRight: sidebarExpanded ? '320px' : '80px' }}
                >
                    {/* HEADER */}
                    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
                        <div className="flex flex-col gap-5 px-8 py-6 xl:flex-row xl:items-center xl:justify-between">
                            {/* Mobile menu toggle (optional) */}
                            <button
                                onClick={toggleSidebar}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 xl:hidden"
                            >
                                <Menu size={18} />
                            </button>

                            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                                <Search size={18} className="text-slate-400" />
                                <input
                                    placeholder="جستجو..."
                                    className="w-[340px] bg-transparent text-sm outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-5">
                                <div className="text-left">
                                    <p className="text-sm font-bold text-slate-900">سامان زارع</p>
                                    <p className="mt-2 text-xs text-slate-500">
                                        Wholesale Customer
                                    </p>
                                </div>
                                <button className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                                    <div className="h-11 w-11 rounded-xl bg-blue-600" />
                                    <ChevronDown size={16} />
                                </button>
                            </div>
                        </div>
                    </header>

                    <main className="p-8">{children}</main>
                </div>
            </div>
        </div>
    );
}
