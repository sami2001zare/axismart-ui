'use client';
import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useBrandStore } from '@/store/brandStore';

export default function AdminBrandsPage() {
    const { brands, addBrand, updateBrand, deleteBrand } = useBrandStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', slug: '', logo: '', description: '' });

    const brandList = Array.isArray(brands) ? brands : [];

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

    const handleEdit = (brand: any) => {
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
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">مدیریت برندها</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                >
                    <Plus size={18} /> افزودن برند
                </button>
            </div>

            {brandList.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl">
                    <p className="text-slate-500">هیچ برندی وجود ندارد. اولین برند را اضافه کنید.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-right">
                        <thead className="bg-slate-50 border-b border-slate-200">
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
                                    <td className="px-6 py-4 text-slate-500">{brand.description || '-'}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(brand)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(brand.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg">
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
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-[500px]">
                        <h2 className="text-xl font-bold mb-4">{editingBrand ? 'ویرایش برند' : 'افزودن برند'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">نام برند</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border border-slate-200 rounded-xl px-4 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">شناسه یکتا (slug)</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full border border-slate-200 rounded-xl px-4 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">لوگو (URL اختیاری)</label>
                                <input
                                    type="url"
                                    value={formData.logo}
                                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                                    className="w-full border border-slate-200 rounded-xl px-4 py-2"
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">توضیحات</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full border border-slate-200 rounded-xl px-4 py-2"
                                    rows={3}
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-xl">
                                    انصراف
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl">
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