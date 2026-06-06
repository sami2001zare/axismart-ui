// components/ProductCard.tsx (updated)
'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/store/productStore';

export default function ProductCard({ product }: { product: Product }) {
    const { addItem } = useCartStore();

    const formatPrice = (price: number) => price.toLocaleString() + ' تومان';

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // prevent Link navigation
        if (product.stock > 0) {
            addItem(product, 1);
            toast.success(`${product.name} به سبد خرید اضافه شد`);
        } else {
            toast.error('این محصول موجود نیست');
        }
    };

    const stockStatus =
        product.stock > 0
            ? { label: 'موجود', color: 'bg-green-100 text-green-700' }
            : { label: 'ناموجود', color: 'bg-red-100 text-red-700' };

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Link href={`/products/${product.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                    {product.imageUrl ? (
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-slate-300">
                            <svg
                                className="h-16 w-16"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                    )}
                    <div className="absolute top-3 right-3">
                        <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${stockStatus.color} shadow-sm`}
                        >
                            {stockStatus.label}
                        </span>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="line-clamp-1 text-base font-semibold text-slate-800 transition group-hover:text-blue-600">
                        {product.name}
                    </h3>
                    <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-xl font-bold text-blue-600">
                            {formatPrice(product.price)}
                        </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                        {product.description || 'بدون توضیحات'}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                        <span>موجودی: {product.stock} عدد</span>
                    </div>
                </div>
            </Link>
            <button
                onClick={handleAddToCart}
                className="absolute bottom-4 left-4 rounded-full bg-blue-600 p-2.5 text-white opacity-0 shadow-md transition-all duration-200 group-hover:opacity-100 hover:bg-blue-700"
            >
                <ShoppingCart size={18} />
            </button>
        </div>
    );
}
