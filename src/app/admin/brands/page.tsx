'use client';
import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useBrandStore } from '@/store/brandStore';

interface Brand {
    id: string;
    name: string;
    slug: string;
    logo?: string;
    description?: string;
}

export default function AdminBrandsPage() {
    const { brands, addBrand, updateBrand, deleteBrand } = useBrandStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
    const [formData, setFormData] = useState<Omit<Brand, 'id'>>({
        name: '',
        slug: '',
        logo: '',
        description: '',
    });

    const brandList: Brand[] = Array.isArray(brands) ? brands : [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingBrand) {
            updateBrand(editingBrand.id, formData);
        } else {
            addBrand(formData);
        }
        setIsModalOpen(false);
        setEditingBrand(null);
        setFormData({ name: '', slug: '', logo: '', description: '' });
    };

    const handleEdit = (brand: Brand) => {
        setEditingBrand(brand);
        setFormData({
            name: brand.name,
            slug: brand.slug,
            logo: brand.logo || '',
            description: brand.description || '',
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('آیا از حذف این برند مطمئن هستید؟')) {
            deleteBrand(id);
        }
    };

    return (
        <div className="p-8" dir="rtl">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">مدیریت برندها</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white"
                >
                    <Plus size={18} /> افزودن برند
                </button>
            </div>

            {brandList.length === 0 ? (
                <div className="rounded-2xl bg-slate-50 py-12 text-center">
                    <p className="text-slate-500">
                        هیچ برندی وجود ندارد. اولین برند را اضافه کنید.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <table className="w-full text-right">
                        <thead className="border-b border-slate-200 bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-sm font-medium">نام برند</th>
                                <th className="px-6 py-3 text-sm font-medium">شناسه یکتا</th>
                                <th className="px-6 py-3 text-sm font-medium">توضیحات</th>
                                <th className="px-6 py-3 text-sm font-medium">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brandList.map((brand) => (
                                <tr key={brand.id} className="border-b border-slate-100">
                                    <td className="px-6 py-4">{brand.name}</td>
                                    <td className="px-6 py-4 text-slate-500">{brand.slug}</td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {brand.description || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(brand)}
                                                className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(brand.id)}
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
                            {editingBrand ? 'ویرایش برند' : 'افزودن برند'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="mb-1 block text-sm font-medium">نام برند</label>
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
                                <label className="mb-1 block text-sm font-medium">
                                    لوگو (URL اختیاری)
                                </label>
                                <input
                                    type="url"
                                    value={formData.logo}
                                    onChange={(e) =>
                                        setFormData({ ...formData, logo: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2"
                                    placeholder="https://..."
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
                                    {editingBrand ? 'ذخیره تغییرات' : 'افزودن'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
