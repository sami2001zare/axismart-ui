// app/admin/categories/page.tsx
'use client';
import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useCategoryStore } from '@/store/categoryStore';

export default function AdminCategoriesPage() {
    const { categories, addCategory, updateCategory, deleteCategory } = useCategoryStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', slug: '', description: '' });

    // Make sure categories is always an array (just in case)
    const categoryList = Array.isArray(categories) ? categories : [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            updateCategory(editingCategory.id, formData);
        } else {
            addCategory(formData);
        }
        setIsModalOpen(false);
        setEditingCategory(null);
        setFormData({ name: '', slug: '', description: '' });
    };

    const handleEdit = (category: any) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            slug: category.slug,
            description: category.description || '',
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('آیا از حذف این دسته‌بندی مطمئن هستید؟')) {
            deleteCategory(id);
        }
    };

    return (
        <div className="p-8" dir="rtl">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">مدیریت دسته‌بندی‌ها</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white"
                >
                    <Plus size={18} /> افزودن دسته‌بندی
                </button>
            </div>

            {categoryList.length === 0 ? (
                <div className="rounded-2xl bg-slate-50 py-12 text-center">
                    <p className="text-slate-500">
                        هیچ دسته‌بندی وجود ندارد. اولین دسته‌بندی را اضافه کنید.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <table className="w-full text-right">
                        <thead className="border-b border-slate-200 bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-sm font-medium">نام</th>
                                <th className="px-6 py-3 text-sm font-medium">شناسه یکتا</th>
                                <th className="px-6 py-3 text-sm font-medium">توضیحات</th>
                                <th className="px-6 py-3 text-sm font-medium">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryList.map((cat) => (
                                <tr key={cat.id} className="border-b border-slate-100">
                                    <td className="px-6 py-4">{cat.name}</td>
                                    <td className="px-6 py-4 text-slate-500">{cat.slug}</td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {cat.description || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(cat)}
                                                className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cat.id)}
                                                className="rounded-lg p-2 text-red-600 hover:bg-red-50"
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

            {/* Modal form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-[500px] rounded-2xl bg-white p-6">
                        <h2 className="mb-4 text-xl font-bold">
                            {editingCategory ? 'ویرایش' : 'افزودن'} دسته‌بندی
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="mb-1 block text-sm font-medium">نام</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="mb-1 block text-sm font-medium">
                                    شناسه یکتا (slug)
                                </label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) =>
                                        setFormData({ ...formData, slug: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="mb-1 block text-sm font-medium">توضیحات</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2"
                                    rows={3}
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="rounded-xl border px-4 py-2"
                                >
                                    انصراف
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-xl bg-blue-600 px-4 py-2 text-white"
                                >
                                    {editingCategory ? 'ذخیره تغییرات' : 'افزودن'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
