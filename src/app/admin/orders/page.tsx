'use client';

import { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { Search, Eye, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Order, useOrderStore } from '@/store/orderStore';

const statusConfig = {
    pending: { label: 'در انتظار', color: 'bg-amber-100 text-amber-700', icon: Clock },
    processing: { label: 'در حال پردازش', color: 'bg-blue-100 text-blue-700', icon: Package },
    shipped: { label: 'ارسال شده', color: 'bg-purple-100 text-purple-700', icon: Truck },
    delivered: { label: 'تحویل داده شده', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    cancelled: { label: 'لغو شده', color: 'bg-red-100 text-red-700', icon: XCircle },
};

export default function AdminOrdersPage() {
    const { orders, updateOrderStatus } = useOrderStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const orderList = Array.isArray(orders) ? orders : [];

    // Filter orders
    const filteredOrders = useMemo(() => {
        let filtered = orderList;
        if (statusFilter !== 'all') {
            filtered = filtered.filter((o) => o.status === statusFilter);
        }
        if (searchTerm) {
            filtered = filtered.filter(
                (o) =>
                    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    o.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return filtered;
    }, [orderList, statusFilter, searchTerm]);

    // Pagination
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
        updateOrderStatus(orderId, newStatus);
        toast.success(`وضعیت سفارش به "${statusConfig[newStatus].label}" تغییر کرد`);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('fa-IR');
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString() + ' تومان';
    };

    return (
        <div className="p-6 md:p-8" dir="rtl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">مدیریت سفارشات</h1>
                <p className="mt-1 text-slate-500">مشاهده، جستجو و به‌روزرسانی وضعیت سفارشات</p>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 gap-3">
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="جستجو (شماره سفارش یا نام مشتری)..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full rounded-xl border border-slate-200 py-2.5 pr-10 pl-4 outline-none focus:border-blue-400"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-400"
                    >
                        <option value="all">همه وضعیت‌ها</option>
                        <option value="pending">در انتظار</option>
                        <option value="processing">در حال پردازش</option>
                        <option value="shipped">ارسال شده</option>
                        <option value="delivered">تحویل داده شده</option>
                        <option value="cancelled">لغو شده</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {filteredOrders.length === 0 ? (
                    <div className="py-12 text-center">
                        <Package className="mx-auto h-12 w-12 text-slate-400" />
                        <p className="mt-2 text-slate-500">سفارشی یافت نشد.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="border-b border-slate-200 bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        شماره سفارش
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        مشتری
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        تاریخ
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        مبلغ کل
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        وضعیت
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        عملیات
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedOrders.map((order) => {
                                    return (
                                        <tr
                                            key={order.id}
                                            className="border-b border-slate-100 hover:bg-slate-50"
                                        >
                                            <td className="px-6 py-4 font-mono text-sm font-medium text-slate-900">
                                                {order.id}
                                            </td>
                                            <td className="px-6 py-4 text-slate-700">
                                                {order.customerName}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">
                                                {formatDate(order.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-slate-900">
                                                {formatPrice(order.total)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) =>
                                                            handleStatusChange(
                                                                order.id,
                                                                e.target.value as Order['status']
                                                            )
                                                        }
                                                        className={`rounded-full px-3 py-1 text-xs font-medium ${statusConfig[order.status].color} border-0 focus:ring-1 focus:ring-blue-400`}
                                                    >
                                                        <option value="pending">در انتظار</option>
                                                        <option value="processing">
                                                            در حال پردازش
                                                        </option>
                                                        <option value="shipped">ارسال شده</option>
                                                        <option value="delivered">
                                                            تحویل داده شده
                                                        </option>
                                                        <option value="cancelled">لغو شده</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center gap-2">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm disabled:opacity-50"
                    >
                        قبلی
                    </button>
                    <span className="rounded-xl border border-slate-200 px-4 py-1.5 text-sm">
                        {currentPage} از {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm disabled:opacity-50"
                    >
                        بعدی
                    </button>
                </div>
            )}

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-2xl rounded-2xl bg-white p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900">جزئیات سفارش</h2>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="rounded-lg p-1 hover:bg-slate-100"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                                <div>
                                    <p className="text-sm text-slate-500">شماره سفارش</p>
                                    <p className="font-mono font-medium">{selectedOrder.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">مشتری</p>
                                    <p className="font-medium">{selectedOrder.customerName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">تاریخ ثبت</p>
                                    <p>{formatDate(selectedOrder.createdAt)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">وضعیت</p>
                                    <span
                                        className={`inline-block rounded-full px-2 py-1 text-xs ${statusConfig[selectedOrder.status].color}`}
                                    >
                                        {statusConfig[selectedOrder.status].label}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h3 className="mb-2 font-semibold text-slate-900">محصولات</h3>
                                <div className="rounded-xl border border-slate-200">
                                    <table className="w-full text-right">
                                        <thead className="border-b border-slate-200 bg-slate-50">
                                            <tr>
                                                <th className="px-4 py-2 text-sm">نام محصول</th>
                                                <th className="px-4 py-2 text-sm">تعداد</th>
                                                <th className="px-4 py-2 text-sm">قیمت واحد</th>
                                                <th className="px-4 py-2 text-sm">مجموع</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedOrder.items.map((item, idx) => (
                                                <tr key={idx} className="border-b border-slate-100">
                                                    <td className="px-4 py-2">
                                                        {item.productName}
                                                    </td>
                                                    <td className="px-4 py-2">{item.quantity}</td>
                                                    <td className="px-4 py-2">
                                                        {formatPrice(item.price)}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {formatPrice(item.price * item.quantity)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="flex justify-between border-t border-slate-100 pt-4">
                                <span className="font-semibold text-slate-900">جمع کل:</span>
                                <span className="text-xl font-bold text-blue-600">
                                    {formatPrice(selectedOrder.total)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
