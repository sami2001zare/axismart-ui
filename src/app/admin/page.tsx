'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import {
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { Package, Users, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import { useProductStore } from '@/store/productStore';
import { useCustomerStore } from '@/store/customerStore';
import { useOrderStore } from '@/store/orderStore';
import { useCategoryStore } from '@/store/categoryStore';

export default function AdminDashboard() {
    const { products } = useProductStore();
    const { customers } = useCustomerStore();
    const { orders } = useOrderStore();
    const { categories } = useCategoryStore();

    const productList = useMemo(() => (Array.isArray(products) ? products : []), [products]);
    const categoryList = useMemo(() => (Array.isArray(categories) ? categories : []), [categories]);
    const customerList = useMemo(() => (Array.isArray(customers) ? customers : []), [customers]);
    const orderList = useMemo(() => (Array.isArray(orders) ? orders : []), [orders]);

    // Calculate metrics
    const totalRevenue = orderList.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalOrders = orderList.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Low stock products (stock < 10)
    const lowStockProducts = productList.filter((p) => p.stock < 10 && p.stock > 0);
    const outOfStockProducts = productList.filter((p) => p.stock === 0);

    // Recent orders (last 5)
    const recentOrders = [...orderList]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    // Sales trend (last 6 months)
    const salesTrend = useMemo(() => {
        const months: Record<string, number> = {};
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
            months[key] = 0;
        }
        orderList.forEach((order) => {
            const date = new Date(order.createdAt);
            const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
            if (months[key] !== undefined) months[key] += order.total;
        });
        return Object.entries(months).map(([month, revenue]) => ({
            month: new Date(month).toLocaleDateString('fa-IR', { month: 'short', year: 'numeric' }),
            revenue: revenue / 1_000_000, // in million Tomans
        }));
    }, [orderList]);

    // Order status distribution
    const statusDistribution = useMemo(() => {
        const statuses: Record<string, number> = {
            pending: 0,
            processing: 0,
            shipped: 0,
            delivered: 0,
            cancelled: 0,
        };
        orderList.forEach((o) => {
            statuses[o.status] = (statuses[o.status] || 0) + 1;
        });
        const labels: Record<string, string> = {
            pending: 'در انتظار',
            processing: 'در حال پردازش',
            shipped: 'ارسال شده',
            delivered: 'تحویل داده شده',
            cancelled: 'لغو شده',
        };
        const colors = ['#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444'];
        return Object.entries(statuses).map(([key, value], idx) => ({
            name: labels[key],
            value,
            color: colors[idx],
        }));
    }, [orderList]);

    // Top categories by product count
    const topCategories = useMemo(() => {
        const catCount: Record<string, number> = {};
        productList.forEach((p) => {
            catCount[p.categoryId] = (catCount[p.categoryId] || 0) + 1;
        });
        return Object.entries(catCount)
            .map(([catId, count]) => {
                const cat = categoryList.find((c) => c.id === catId);
                return { name: cat?.name || 'سایر', count };
            })
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [productList, categoryList]);

    const formatPrice = (price: number) => {
        return price.toLocaleString() + ' تومان';
    };

    const statusConfig: Record<string, { label: string; color: string }> = {
        pending: { label: 'در انتظار', color: 'bg-amber-100 text-amber-700' },
        processing: { label: 'در حال پردازش', color: 'bg-blue-100 text-blue-700' },
        shipped: { label: 'ارسال شده', color: 'bg-purple-100 text-purple-700' },
        delivered: { label: 'تحویل داده شده', color: 'bg-green-100 text-green-700' },
        cancelled: { label: 'لغو شده', color: 'bg-red-100 text-red-700' },
    };

    return (
        <div className="p-6 md:p-8" dir="rtl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">داشبورد مدیریت</h1>
                <p className="mt-1 text-slate-500">خلاصه‌ای از وضعیت فروش، محصولات و مشتریان</p>
            </div>

            {/* Stats Cards */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="کل محصولات"
                    value={productList.length}
                    icon={<Package size={24} />}
                    color="blue"
                    link="/admin/products"
                />
                <StatCard
                    title="کل مشتریان"
                    value={customerList.length}
                    icon={<Users size={24} />}
                    color="green"
                    link="/admin/customers"
                />
                <StatCard
                    title="کل سفارشات"
                    value={totalOrders}
                    icon={<ShoppingBag size={24} />}
                    color="purple"
                    link="/admin/orders"
                />
                <StatCard
                    title="درآمد کل"
                    value={`${(totalRevenue / 1_000_000).toFixed(1)}M تومان`}
                    icon={<DollarSign size={24} />}
                    color="amber"
                />
            </div>

            {/* Secondary Row */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">میانگین ارزش سفارش</p>
                        <TrendingUp size={18} className="text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                        {(averageOrderValue / 1_000_000).toFixed(1)}M تومان
                    </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">محصولات با موجودی کم</p>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-amber-600">
                            {lowStockProducts.length}
                        </span>
                        <span className="text-sm text-slate-400">محصول</span>
                    </div>
                    {lowStockProducts.length > 0 && (
                        <Link
                            href="/admin/products?filter=lowstock"
                            className="mt-2 inline-block text-xs text-blue-600 hover:underline"
                        >
                            مشاهده و مدیریت
                        </Link>
                    )}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">محصولات ناموجود</p>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-red-600">
                            {outOfStockProducts.length}
                        </span>
                        <span className="text-sm text-slate-400">محصول</span>
                    </div>
                    {outOfStockProducts.length > 0 && (
                        <Link
                            href="/admin/products?filter=outofstock"
                            className="mt-2 inline-block text-xs text-blue-600 hover:underline"
                        >
                            مشاهده و مدیریت
                        </Link>
                    )}
                </div>
            </div>

            {/* Charts Row */}
            <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Sales Trend */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">
                        روند فروش (میلیون تومان)
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Order Status Distribution */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">وضعیت سفارشات</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={statusDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) =>
                                    `${name} (${(percent! * 100).toFixed(0)}%)`
                                }
                                outerRadius={100}
                                dataKey="value"
                            >
                                {statusDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bottom Row: Recent Orders & Top Categories */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Recent Orders */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-900">آخرین سفارشات</h2>
                        <Link
                            href="/admin/orders"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            مشاهده همه
                        </Link>
                    </div>
                    {recentOrders.length === 0 ? (
                        <p className="text-center text-slate-400">سفارشی وجود ندارد</p>
                    ) : (
                        <div className="space-y-3">
                            {recentOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex items-center justify-between border-b border-slate-100 pb-3"
                                >
                                    <div>
                                        <p className="font-mono text-sm font-medium text-slate-900">
                                            {order.id}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {order.customerName}
                                        </p>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-slate-900">
                                            {formatPrice(order.total)}
                                        </p>
                                        <span
                                            className={`inline-block rounded-full px-2 py-0.5 text-xs ${statusConfig[order.status]?.color || 'bg-slate-100'}`}
                                        >
                                            {statusConfig[order.status]?.label || order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Top Categories */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">
                        دسته‌بندی‌های برتر
                    </h2>
                    {topCategories.length === 0 ? (
                        <p className="text-center text-slate-400">دسته‌بندی وجود ندارد</p>
                    ) : (
                        <div className="space-y-3">
                            {topCategories.map((cat, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <span className="text-slate-700">{cat.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-slate-900">
                                            {cat.count}
                                        </span>
                                        <span className="text-xs text-slate-400">محصول</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <Link
                        href="/admin/categories"
                        className="mt-4 inline-block text-sm text-blue-600 hover:underline"
                    >
                        مدیریت دسته‌بندی‌ها
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Stat Card Component
function StatCard({
    title,
    value,
    icon,
    color,
    link,
}: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: 'blue' | 'green' | 'purple' | 'amber';
    link?: string;
}) {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
        amber: 'bg-amber-100 text-amber-600',
    };
    const content = (
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
    if (link) {
        return <Link href={link}>{content}</Link>;
    }
    return content;
}
