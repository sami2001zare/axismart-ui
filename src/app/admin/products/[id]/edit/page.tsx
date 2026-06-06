'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { ArrowRight, Upload, X } from 'lucide-react';
import { useCategoryStore } from '@/store/categoryStore';
import { useBrandStore } from '@/store/brandStore';
import { useProductStore } from '@/store/productStore';

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params.id as string;

    const { categories } = useCategoryStore();
    const { brands } = useBrandStore();
    const { products, updateProduct, getProductBySlug } = useProductStore();

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        categoryId: '',
        brandId: '',
        price: '',
        stock: '',
        description: '',
        imageUrl: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Load product data
    useEffect(() => {
        const product = (Array.isArray(products) ? products : []).find((p) => p.id === productId);
        if (product) {
            setFormData({
                name: product.name,
                slug: product.slug,
                categoryId: product.categoryId,
                brandId: product.brandId,
                price: product.price.toString(),
                stock: product.stock.toString(),
                description: product.description || '',
                imageUrl: product.imageUrl || '',
            });
            setImagePreview(product.imageUrl || null);
        } else {
            toast.error('محصول یافت نشد');
            router.push('/admin/products');
        }
        setIsLoading(false);
    }, [productId, products, router]);

    // Auto‑generate slug from name (optional, only if slug is empty or user hasn't touched)
    // const generateSlug = (name: string) => {
    //     return name
    //         .trim()
    //         .toLowerCase()
    //         .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FFa-z0-9]+/g, '-')
    //         .replace(/^-+|-+$/g, '');
    // };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setFormData((prev) => ({
            ...prev,
            name,
            // Only auto‑update slug if it's currently the auto‑generated version (optional)
            // For simplicity, we'll only auto‑fill if slug is empty OR exactly matches old auto‑slug
            // But better to let user control. We'll just update name and leave slug.
        }));
        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setFormData((prev) => ({ ...prev, imageUrl: url }));
        setImagePreview(url || null);
        if (errors.imageUrl) setErrors((prev) => ({ ...prev, imageUrl: '' }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'نام محصول الزامی است';
        if (!formData.slug.trim()) {
            newErrors.slug = 'شناسه یکتا (slug) الزامی است';
        } else {
            // Check slug uniqueness, but ignore current product's own slug
            const existing = getProductBySlug(formData.slug);
            if (existing && existing.id !== productId) {
                newErrors.slug = 'این slug قبلاً استفاده شده است';
            }
        }
        if (!formData.categoryId) newErrors.categoryId = 'دسته‌بندی را انتخاب کنید';
        if (!formData.brandId) newErrors.brandId = 'برند را انتخاب کنید';
        if (!formData.price) {
            newErrors.price = 'قیمت الزامی است';
        } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            newErrors.price = 'قیمت باید عددی مثبت باشد';
        }
        if (!formData.stock) {
            newErrors.stock = 'موجودی الزامی است';
        } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
            newErrors.stock = 'موجودی باید عددی نامنفی باشد';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error('لطفاً خطاهای فرم را اصلاح کنید');
            return;
        }

        setIsSubmitting(true);
        try {
            updateProduct(productId, {
                name: formData.name,
                slug: formData.slug,
                categoryId: formData.categoryId,
                brandId: formData.brandId,
                price: Number(formData.price),
                stock: Number(formData.stock),
                description: formData.description,
                imageUrl: formData.imageUrl || undefined,
            });
            toast.success('محصول با موفقیت به‌روزرسانی شد');
            router.push('/admin/products');
        } catch (error) {
            toast.error('خطایی رخ داد. لطفاً دوباره تلاش کنید.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="text-slate-500">در حال بارگذاری محصول...</div>
            </div>
        );
    }

    const categoryList = Array.isArray(categories) ? categories : [];
    const brandList = Array.isArray(brands) ? brands : [];

    return (
        <div className="p-8" dir="rtl">
            {/* Header */}
            <div className="mb-8 flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-50"
                >
                    <ArrowRight size={18} />
                </button>
                <h1 className="text-2xl font-bold text-slate-900">ویرایش محصول</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main fields - 2 columns */}
                    <div className="space-y-6 lg:col-span-2">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6">
                            <h2 className="mb-4 text-lg font-semibold text-slate-900">
                                اطلاعات پایه
                            </h2>
                            <div className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">
                                        نام محصول <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleNameChange}
                                        className={`w-full rounded-xl border px-4 py-2.5 transition outline-none focus:ring-2 ${
                                            errors.name
                                                ? 'border-red-500 focus:ring-red-200'
                                                : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
                                        }`}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>

                                {/* Slug */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">
                                        شناسه یکتا (slug) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        className={`w-full rounded-xl border px-4 py-2.5 transition outline-none focus:ring-2 ${
                                            errors.slug
                                                ? 'border-red-500 focus:ring-red-200'
                                                : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
                                        }`}
                                    />
                                    {errors.slug && (
                                        <p className="mt-1 text-sm text-red-500">{errors.slug}</p>
                                    )}
                                    <p className="mt-1 text-xs text-slate-400">
                                        فقط حروف انگلیسی، اعداد و خط تیره مجاز است
                                    </p>
                                </div>

                                {/* Category & Brand row */}
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            دسته‌بندی <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="categoryId"
                                            value={formData.categoryId}
                                            onChange={handleChange}
                                            className={`w-full rounded-xl border px-4 py-2.5 outline-none ${
                                                errors.categoryId
                                                    ? 'border-red-500'
                                                    : 'border-slate-200 focus:border-blue-400'
                                            }`}
                                        >
                                            <option value="">انتخاب کنید</option>
                                            {categoryList.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.categoryId && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.categoryId}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            برند <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="brandId"
                                            value={formData.brandId}
                                            onChange={handleChange}
                                            className={`w-full rounded-xl border px-4 py-2.5 outline-none ${
                                                errors.brandId
                                                    ? 'border-red-500'
                                                    : 'border-slate-200 focus:border-blue-400'
                                            }`}
                                        >
                                            <option value="">انتخاب کنید</option>
                                            {brandList.map((brand) => (
                                                <option key={brand.id} value={brand.id}>
                                                    {brand.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.brandId && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.brandId}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Price & Stock row */}
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            قیمت (تومان) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className={`w-full rounded-xl border px-4 py-2.5 outline-none ${
                                                errors.price
                                                    ? 'border-red-500'
                                                    : 'border-slate-200 focus:border-blue-400'
                                            }`}
                                        />
                                        {errors.price && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.price}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            موجودی (عدد) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleChange}
                                            className={`w-full rounded-xl border px-4 py-2.5 outline-none ${
                                                errors.stock
                                                    ? 'border-red-500'
                                                    : 'border-slate-200 focus:border-blue-400'
                                            }`}
                                        />
                                        {errors.stock && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.stock}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description Card */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6">
                            <h2 className="mb-4 text-lg font-semibold text-slate-900">
                                توضیحات محصول
                            </h2>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={6}
                                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-400"
                            />
                        </div>
                    </div>

                    {/* Sidebar - Image upload */}
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6">
                            <h2 className="mb-4 text-lg font-semibold text-slate-900">
                                تصویر محصول
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6">
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img
                                                src={imagePreview}
                                                alt="Product preview"
                                                className="max-h-48 w-auto rounded-lg object-contain"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        imageUrl: '',
                                                    }));
                                                    setImagePreview(null);
                                                }}
                                                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <Upload className="mx-auto h-12 w-12 text-slate-400" />
                                            <p className="mt-2 text-sm text-slate-500">
                                                آدرس تصویر را وارد کنید
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleImageUrlChange}
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-400"
                                    placeholder="https://example.com/image.jpg"
                                />
                                <p className="text-xs text-slate-400">
                                    لینک مستقیم تصویر (اختیاری)
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <h3 className="font-semibold text-slate-900">نکته</h3>
                            <p className="mt-2 text-sm text-slate-600">
                                تغییرات بلافاصله در لیست محصولات و سایر بخش‌ها اعمال می‌شود.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-4 border-t border-slate-200 pt-6">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        انصراف
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isSubmitting ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                    </button>
                </div>
            </form>
        </div>
    );
}
