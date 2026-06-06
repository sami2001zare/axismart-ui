'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { useProductStore } from '@/store/productStore';
import { useCategoryStore } from '@/store/categoryStore';
import { useBrandStore } from '@/store/brandStore';
import Image from 'next/image';

export default function ProductsListPage() {
    const { products, deleteProduct } = useProductStore();
    const { categories } = useCategoryStore();
    const { brands } = useBrandStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Helper to get category name by id
    const getCategoryName = (categoryId: string) => {
        const cat = (Array.isArray(categories) ? categories : []).find((c) => c.id === categoryId);
        return cat?.name || 'دسته‌بندی نشده';
    };

    // Helper to get brand name by id
    const getBrandName = (brandId: string) => {
        const br = (Array.isArray(brands) ? brands : []).find((b) => b.id === brandId);
        return br?.name || 'برند نامشخص';
    };

    const handleDelete = async (id: string) => {
        if (confirm('آیا از حذف این محصول مطمئن هستید؟')) {
            setDeletingId(id);
            try {
                deleteProduct(id);
                toast.success('محصول با موفقیت حذف شد');
            } catch (error) {
                console.log(error);
                toast.error('خطا در حذف محصول');
            } finally {
                setDeletingId(null);
            }
        }
    };

    // Filter products based on search (name or slug)
    const filteredProducts = (Array.isArray(products) ? products : []).filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Format price with commas
    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <div className="p-8" dir="rtl">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-slate-900">مدیریت محصولات</h1>
                <Link
                    href="/admin/products/create"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    <Plus size={18} />
                    افزودن محصول جدید
                </Link>
            </div>

            {/* Search bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="جستجوی محصول (نام یا slug)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-400"
                />
            </div>

            {/* Products table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {filteredProducts.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-slate-500">هیچ محصولی یافت نشد.</p>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="mt-2 text-sm text-blue-600 hover:underline"
                            >
                                پاک کردن فیلتر
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="border-b border-slate-200 bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        تصویر
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        نام محصول
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        دسته‌بندی
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        برند
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        قیمت (تومان)
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        موجودی
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-slate-600">
                                        عملیات
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="border-b border-slate-100 transition hover:bg-slate-50"
                                    >
                                        <td className="px-6 py-4">
                                            {product.imageUrl ? (
                                                <Image
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                    width={500} // Required: specify width
                                                    height={500} // Required: specify height
                                                />
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                                                    <Eye size={20} />
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {product.name}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {getCategoryName(product.categoryId)}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {getBrandName(product.brandId)}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-slate-900">
                                            {formatPrice(product.price)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                                    product.stock > 0
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}
                                            >
                                                {product.stock > 0
                                                    ? `${product.stock} عدد`
                                                    : 'ناموجود'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/admin/products/${product.id}/edit`}
                                                    className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                                                >
                                                    <Edit2 size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    disabled={deletingId === product.id}
                                                    className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
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
                )}
            </div>

            {/* Optional: summary */}
            <div className="mt-4 text-sm text-slate-500">
                نمایش {filteredProducts.length} از{' '}
                {(Array.isArray(products) ? products : []).length} محصول
            </div>
        </div>
    );
}
