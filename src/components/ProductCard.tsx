// components/ProductCard.tsx
import { Product } from '@/store/productStore';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
    const formatPrice = (price: number) => price.toLocaleString() + ' تومان';

    return (
        <Link href={`/products/${product.slug}`} className="group block">
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition hover:shadow-md">
                <div className="aspect-square bg-slate-100 flex items-center justify-center">
                    {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                    ) : (
                        <div className="text-slate-400">بدون تصویر</div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-slate-900 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{product.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                        <span className="text-lg font-bold text-blue-600">{formatPrice(product.price)}</span>
                        <span className="text-sm text-slate-500">موجودی: {product.stock}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}