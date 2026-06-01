'use client';

import { useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
    Package,
    Users,
    ShoppingBag,
    DollarSign,
} from 'lucide-react';
import { useProductStore } from '@/store/productStore';
import { useCategoryStore } from '@/store/categoryStore';
import { useCustomerStore } from '@/store/customerStore';
import { useOrderStore } from '@/store/orderStore';

export default function AdminAnalyticsPage() {
    const { products } = useProductStore();
    const { categories } = useCategoryStore();
    const { customers } = useCustomerStore();
    const { orders } = useOrderStore();

    const productList = Array.isArray(products) ? products : [];
    const categoryList = Array.isArray(categories) ? categories : [];
    const customerList = Array.isArray(customers) ? customers : [];
    const orderList = Array.isArray(orders) ? orders : [];

    // Calculate key metrics
    const totalRevenue = orderList.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orderList.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const completedOrders = orderList.filter(o => o.status === 'delivered').length;
    const conversionRate = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;

    // Sales trend by month (last 6 months)
    const salesTrend = useMemo(() => {
        const months: Record<string, number> = {};
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
            months[key] = 0;
        }
        orderList.forEach(order => {
            const date = new Date(order.createdAt);
            const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
            if (months[key] !== undefined) months[key] += order.total;
        });
        return Object.entries(months).map(([month, revenue]) => ({
            month: new Date(month).toLocaleDateString('fa-IR', { month: 'long', year: 'numeric' }),
            revenue: revenue / 1_000_000, // in million Tomans
        }));
    }, [orderList]);

    // Category distribution (by number of products)
    const categoryDistribution = useMemo(() => {
        const map: Record<string, number> = {};
        productList.forEach(p => {
            map[p.categoryId] = (map[p.categoryId] || 0) + 1;
        });
        return Object.entries(map).map(([catId, count]) => {
            const cat = categoryList.find(c => c.id === catId);
            return { name: cat?.name || 'سایر', value: count };
        });
    }, [productList, categoryList]);

    // Order status distribution
    const statusDistribution = useMemo(() => {
        const statuses: Record<string, number> = {
            pending: 0,
            processing: 0,
            shipped: 0,
            delivered: 0,
            cancelled: 0,
        };
        orderList.forEach(o => {
            statuses[o.status] = (statuses[o.status] || 0) + 1;
        });
        const labels: Record<string, string> = {
            pending: 'در انتظار',
            processing: 'در حال پردازش',
            shipped: 'ارسال شده',
            delivered: 'تحویل داده شده',
            cancelled: 'لغو شده',
        };
        return Object.entries(statuses).map(([key, value]) => ({
            name: labels[key],
            value,
            color: key === 'delivered' ? '#10b981' : key === 'cancelled' ? '#ef4444' : '#f59e0b',
        }));
    }, [orderList]);

    // Top products by sales (mock – since we don't have product sales yet, we'll derive from order items if available; fallback to random)
    // For simplicity, we'll show top categories or just a placeholder
    const topProducts = useMemo(() => {
        // If you have order items linking to product IDs, you could calculate.
        // Here we'll just show top categories by product count.
        return categoryDistribution.slice(0, 5).map(cat => ({
            name: cat.name,
            sales: cat.value * 1000000, // dummy
        }));
    }, [categoryDistribution]);

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    return (
        <div className="p-6 md:p-8" dir="rtl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">داشبورد تحلیلی</h1>
                <p className="mt-1 text-slate-500">نمایش آمار فروش، محصولات و مشتریان</p>
            </div>

            {/* Stats Cards */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="کل محصولات"
                    value={productList.length}
                    icon={<Package size={24} />}
                    color="blue"
                />
                <StatCard
                    title="کل مشتریان"
                    value={customerList.length}
                    icon={<Users size={24} />}
                    color="green"
                />
                <StatCard
                    title="کل سفارشات"
                    value={totalOrders}
                    icon={<ShoppingBag size={24} />}
                    color="purple"
                />
                <StatCard
                    title="درآمد کل"
                    value={`${(totalRevenue / 1_000_000).toFixed(1)}M تومان`}
                    icon={<DollarSign size={24} />}
                    color="amber"
                />
            </div>

            {/* Secondary row */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">میانگین ارزش سفارش</p>
                    <p className="text-2xl font-bold text-slate-900">
                        {(averageOrderValue / 1_000_000).toFixed(1)}M تومان
                    </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">نرخ تکمیل سفارش</p>
                    <p className="text-2xl font-bold text-green-600">{conversionRate.toFixed(1)}%</p>
                    <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                        <div
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: `${conversionRate}%` }}
                        />
                    </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">سفارشات تکمیل شده</p>
                    <p className="text-2xl font-bold text-slate-900">{completedOrders}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Sales Trend */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">روند فروش (میلیون تومان)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Category Distribution (Pie) */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">توزیع محصولات در دسته‌بندی‌ها</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {categoryDistribution.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Order Status Distribution (Bar) */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">وضعیت سفارشات</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={statusDistribution}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Products / Categories (simple list) */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">پربازده‌ترین دسته‌بندی‌ها</h2>
                    <div className="space-y-3">
                        {topProducts.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <span className="font-medium text-slate-700">{item.name}</span>
                                <span className="text-sm text-slate-500">{item.sales.toLocaleString()} تومان</span>
                            </div>
                        ))}
                        {topProducts.length === 0 && (
                            <p className="text-center text-slate-400">داده‌ای موجود نیست</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper component for stat cards
function StatCard({
    title,
    value,
    icon,
    color,
}: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: 'blue' | 'green' | 'purple' | 'amber';
}) {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
        amber: 'bg-amber-100 text-amber-600',
    };
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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