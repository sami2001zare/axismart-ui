'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import {
    Plus,
    Edit2,
    Trash2,
    Search,
    Users,
    ShoppingBag,
    DollarSign,
    UserCheck,
    Grid,
    List,
    X,
    Mail,
    Phone,
    MapPin,
    Calendar,
} from 'lucide-react';
import { Customer, useCustomerStore } from '@/store/customerStore';

export default function AdminCustomersPage() {
    const { customers, addCustomer, updateCustomer, deleteCustomer } = useCustomerStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const customerList = Array.isArray(customers) ? customers : [];

    // Stats
    const totalCustomers = customerList.length;
    const activeCustomers = customerList.filter((c) => c.status === 'active').length;
    const totalSpent = customerList.reduce((sum, c) => sum + (c.totalSpent || 0), 0);

    // Filtering
    const filteredCustomers = customerList
        .filter((c) => statusFilter === 'all' || c.status === statusFilter)
        .filter(
            (c) =>
                c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.phone.includes(searchTerm)
        );

    // Pagination
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const paginatedCustomers = filteredCustomers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleOpenModal = (customer?: Customer) => {
        if (customer) {
            setEditingCustomer(customer);
            setFormData({
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                address: customer.address,
            });
        } else {
            setEditingCustomer(null);
            setFormData({ name: '', email: '', phone: '', address: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCustomer(null);
        setFormData({ name: '', email: '', phone: '', address: '' });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone) {
            toast.error('لطفاً نام، ایمیل و تلفن را وارد کنید');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('ایمیل نامعتبر است');
            return;
        }

        if (editingCustomer) {
            updateCustomer(editingCustomer.id, formData);
            toast.success('مشتری با موفقیت ویرایش شد');
        } else {
            addCustomer(formData);
            toast.success('مشتری جدید اضافه شد');
        }
        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        if (confirm('آیا از حذف این مشتری مطمئن هستید؟')) {
            deleteCustomer(id);
            toast.success('مشتری حذف شد');
        }
    };

    const getInitials = (name: string) => {
        return name.slice(0, 2);
    };

    const formatDate = (date?: string) => {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('fa-IR');
    };

    return (
        <div className="p-6 md:p-8" dir="rtl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">مدیریت مشتریان</h1>
                <p className="mt-1 text-slate-500">مشاهده، جستجو و مدیریت اطلاعات مشتریان</p>
            </div>

            {/* Stats Cards */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">کل مشتریان</p>
                            <p className="text-2xl font-bold text-slate-900">{totalCustomers}</p>
                        </div>
                        <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                            <Users size={24} />
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">مشتریان فعال</p>
                            <p className="text-2xl font-bold text-green-600">{activeCustomers}</p>
                        </div>
                        <div className="rounded-xl bg-green-100 p-3 text-green-600">
                            <UserCheck size={24} />
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">کل خرید</p>
                            <p className="text-2xl font-bold text-slate-900">
                                {totalSpent.toLocaleString()} تومان
                            </p>
                        </div>
                        <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
                            <DollarSign size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters & Actions */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 gap-3">
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="جستجو (نام، ایمیل، تلفن)..."
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
                            setStatusFilter(e.target.value as 'all' | 'active' | 'inactive');
                            setCurrentPage(1);
                        }}
                        className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-400"
                    >
                        <option value="all">همه مشتریان</option>
                        <option value="active">فعال</option>
                        <option value="inactive">غیرفعال</option>
                    </select>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('table')}
                        className={`rounded-xl border p-2.5 transition ${
                            viewMode === 'table'
                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                        <List size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`rounded-xl border p-2.5 transition ${
                            viewMode === 'grid'
                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                        <Grid size={18} />
                    </button>
                    <button
                        onClick={() => handleOpenModal()}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        <Plus size={18} />
                        افزودن مشتری
                    </button>
                </div>
            </div>

            {/* Content */}
            {filteredCustomers.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white py-12 text-center">
                    <Users className="mx-auto h-12 w-12 text-slate-400" />
                    <p className="mt-2 text-slate-500">مشتری‌ای یافت نشد.</p>
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="mt-2 text-sm text-blue-600 hover:underline"
                        >
                            پاک کردن فیلتر
                        </button>
                    )}
                </div>
            ) : viewMode === 'table' ? (
                // Table View
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="border-b border-slate-200 bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        مشتری
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        تماس
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        آدرس
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        سفارشات
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        کل خرید
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        آخرین خرید
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
                                {paginatedCustomers.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        className="border-b border-slate-100 transition hover:bg-slate-50"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-700">
                                                    {getInitials(customer.name)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900">
                                                        {customer.name}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        {customer.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {customer.phone}
                                        </td>
                                        <td className="max-w-[200px] truncate px-6 py-4 text-slate-600">
                                            {customer.address || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {customer.totalOrders || 0}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-slate-600">
                                            {(customer.totalSpent || 0).toLocaleString()} تومان
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {formatDate(customer.lastOrderDate)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                                    customer.status === 'active'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-slate-100 text-slate-500'
                                                }`}
                                            >
                                                {customer.status === 'active' ? 'فعال' : 'غیرفعال'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(customer)}
                                                    className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(customer.id)}
                                                    className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                // Grid View
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {paginatedCustomers.map((customer) => (
                        <div
                            key={customer.id}
                            className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-md"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-700">
                                        {getInitials(customer.name)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">
                                            {customer.name}
                                        </h3>
                                        <span
                                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                customer.status === 'active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-slate-100 text-slate-500'
                                            }`}
                                        >
                                            {customer.status === 'active' ? 'فعال' : 'غیرفعال'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                                    <button
                                        onClick={() => handleOpenModal(customer)}
                                        className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(customer.id)}
                                        className="rounded-lg p-1.5 text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Mail size={14} />
                                    <span className="truncate">{customer.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Phone size={14} />
                                    <span>{customer.phone}</span>
                                </div>
                                {customer.address && (
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <MapPin size={14} />
                                        <span className="truncate">{customer.address}</span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <ShoppingBag size={12} /> {customer.totalOrders || 0} سفارش
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <DollarSign size={12} />{' '}
                                        {(customer.totalSpent || 0).toLocaleString()} تومان
                                    </span>
                                </div>
                                {customer.lastOrderDate && (
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <Calendar size={12} />
                                        <span>
                                            آخرین خرید: {formatDate(customer.lastOrderDate)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900">
                                {editingCustomer ? 'ویرایش مشتری' : 'افزودن مشتری جدید'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="rounded-lg p-1 hover:bg-slate-100"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    نام کامل <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-blue-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    ایمیل <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-blue-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    تلفن <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-blue-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    آدرس
                                </label>
                                <textarea
                                    value={formData.address}
                                    onChange={(e) =>
                                        setFormData({ ...formData, address: e.target.value })
                                    }
                                    rows={2}
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-blue-400"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                >
                                    انصراف
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    {editingCustomer ? 'ذخیره تغییرات' : 'افزودن مشتری'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
