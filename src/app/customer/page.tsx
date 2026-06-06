'use client';

import Link from 'next/link';
import {
    ShoppingBag,
    DollarSign,
    Heart,
    Clock,
    Package,
    User,
    MapPin,
    Shield,
    TrendingUp,
} from 'lucide-react';
import { useOrderStore } from '@/store/orderStore';
import { useProductStore } from '@/store/productStore';
import { useCustomerStoreI } from '@/store/customerStoreI';
import { useState } from 'react';
import Image from 'next/image';

export default function CustomerDashboard() {
    const { customer } = useCustomerStoreI();
    const { orders } = useOrderStore();
    const { products } = useProductStore();

    const [randomId] = useState(() => Math.random());

    // Mock recent orders (filter by customerId – for demo, use first 5)
    const recentOrders = (Array.isArray(orders) ? orders : [])
        .filter((o) => o.customerId === customer.id) // if orders have customerId, else use some mock
        .slice(0, 5);

    // Mock recommended products (random 4)
    const recommendedProducts = (Array.isArray(products) ? products : [])
        .sort(() => 0.5 - randomId)
        .slice(0, 4);

    const formatPrice = (price: number) => price.toLocaleString() + ' تومان';
    const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('fa-IR');

    const statusConfig: Record<string, { label: string; color: string }> = {
        pending: { label: 'در انتظار', color: 'bg-amber-100 text-amber-700' },
        processing: { label: 'در حال پردازش', color: 'bg-blue-100 text-blue-700' },
        shipped: { label: 'ارسال شده', color: 'bg-purple-100 text-purple-700' },
        delivered: { label: 'تحویل داده شده', color: 'bg-green-100 text-green-700' },
        cancelled: { label: 'لغو شده', color: 'bg-red-100 text-red-700' },
    };

    return (
        <div className="space-y-8" dir="rtl">
            {/* Welcome Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold">خوش آمدید، {customer.name}!</h1>
                    <p className="mt-1 text-blue-100">امروز چه کمکی می‌توانیم بکنیم؟</p>
                </div>
                <div className="absolute top-0 left-0 opacity-10">
                    <TrendingUp size={120} />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="کل سفارشات"
                    value={customer.totalOrders}
                    icon={<ShoppingBag size={24} />}
                    color="blue"
                />
                <StatCard
                    title="مجموع خرید"
                    value={formatPrice(customer.totalSpent)}
                    icon={<DollarSign size={24} />}
                    color="green"
                />
                <StatCard
                    title="علاقه‌مندی‌ها"
                    value={customer.wishlistCount}
                    icon={<Heart size={24} />}
                    color="pink"
                />
                <StatCard
                    title="سفارشات در انتظار"
                    value={customer.pendingOrders}
                    icon={<Clock size={24} />}
                    color="amber"
                />
            </div>

            {/* Recent Orders */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">سفارشات اخیر</h2>
                    <Link href="/customer/orders" className="text-sm text-blue-600 hover:underline">
                        مشاهده همه
                    </Link>
                </div>
                {recentOrders.length === 0 ? (
                    <p className="py-8 text-center text-slate-500">هیچ سفارشی یافت نشد.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="border-b border-slate-200">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-medium text-slate-600">
                                        شماره سفارش
                                    </th>
                                    <th className="px-4 py-3 text-sm font-medium text-slate-600">
                                        تاریخ
                                    </th>
                                    <th className="px-4 py-3 text-sm font-medium text-slate-600">
                                        مبلغ
                                    </th>
                                    <th className="px-4 py-3 text-sm font-medium text-slate-600">
                                        وضعیت
                                    </th>
                                    <th className="px-4 py-3 text-sm font-medium text-slate-600"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b border-slate-100">
                                        <td className="px-4 py-3 font-mono text-sm">{order.id}</td>
                                        <td className="px-4 py-3 text-sm">
                                            {formatDate(order.createdAt)}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium">
                                            {formatPrice(order.total)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${statusConfig[order.status]?.color || 'bg-slate-100'}`}
                                            >
                                                {statusConfig[order.status]?.label || order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Link
                                                href={`/customer/orders/${order.id}`}
                                                className="text-sm text-blue-600 hover:underline"
                                            >
                                                جزئیات
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Recommended Products */}
            {recommendedProducts.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-900">محصولات پیشنهادی</h2>
                        <Link href="/products" className="text-sm text-blue-600 hover:underline">
                            مشاهده همه
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {recommendedProducts.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                className="group overflow-hidden rounded-xl border border-slate-100 bg-white transition hover:shadow-md"
                            >
                                <div className="aspect-square overflow-hidden bg-slate-100">
                                    {product.imageUrl ? (
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                            width={500} // Required: specify width
                                            height={500} // Required: specify height
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-slate-300">
                                            <Package size={40} />
                                        </div>
                                    )}
                                </div>
                                <div className="p-3 text-center">
                                    <h3 className="line-clamp-1 font-semibold text-slate-800">
                                        {product.name}
                                    </h3>
                                    <p className="mt-1 text-sm font-bold text-blue-600">
                                        {formatPrice(product.price)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-slate-900">دسترسی سریع</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    <QuickAction
                        href="/customer/profile"
                        icon={<User size={20} />}
                        label="پروفایل"
                    />
                    <QuickAction
                        href="/customer/addresses"
                        icon={<MapPin size={20} />}
                        label="آدرس‌ها"
                    />
                    <QuickAction
                        href="/customer/orders"
                        icon={<ShoppingBag size={20} />}
                        label="سفارشات"
                    />
                    <QuickAction
                        href="/customer/wishlist"
                        icon={<Heart size={20} />}
                        label="علاقه‌مندی‌ها"
                    />
                    <QuickAction
                        href="/customer/security"
                        icon={<Shield size={20} />}
                        label="امنیت"
                    />
                </div>
            </div>
        </div>
    );
}

// Helper Components
function StatCard({
    title,
    value,
    icon,
    color,
}: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: 'blue' | 'green' | 'pink' | 'amber';
}) {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        pink: 'bg-pink-100 text-pink-600',
        amber: 'bg-amber-100 text-amber-600',
    };
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500">{title}</p>
                    <p className="text-2xl font-bold text-slate-900">{value}</p>
                </div>
                <div className={`rounded-xl ${colorClasses[color]} p-3`}>{icon}</div>
            </div>
        </div>
    );
}

function QuickAction({
    href,
    icon,
    label,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <Link
            href={href}
            className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 transition hover:bg-slate-50 hover:shadow-sm"
        >
            <div className="text-blue-600">{icon}</div>
            <span className="text-sm font-medium text-slate-700">{label}</span>
        </Link>
    );
}
