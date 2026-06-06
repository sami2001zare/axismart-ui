'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import {
    ShoppingCart,
    Heart,
    Truck,
    ShieldCheck,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    Star,
    Package,
} from 'lucide-react';
import { useProductStore } from '@/store/productStore';
import { useCategoryStore } from '@/store/categoryStore';
import { useBrandStore } from '@/store/brandStore';
import { toast, ToastContainer } from 'react-toastify';
import { useCartStore } from '@/store/cartStore';

export default function ProductDetailPage() {
    const { slug } = useParams();
    const { products } = useProductStore();
    const { categories } = useCategoryStore();
    const { brands } = useBrandStore();

    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const cartButtonRef = useRef<HTMLDivElement>(null);

    const productList = Array.isArray(products) ? products : [];
    const categoryList = Array.isArray(categories) ? categories : [];
    const brandList = Array.isArray(brands) ? brands : [];

    const product = productList.find((p) => p.slug === slug);
    if (!product) notFound();

    const category = categoryList.find((c) => c.id === product.categoryId);
    const brand = brandList.find((b) => b.id === product.brandId);

    // Related products (same category, exclude current, limit 8 for carousel)
    const relatedProducts = productList
        .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
        .slice(0, 8);

    const formatPrice = (price: number) => price.toLocaleString() + ' تومان';

    const stockStatus =
        product.stock > 0
            ? { label: 'موجود در انبار', color: 'text-green-700', bg: 'bg-green-100' }
            : { label: 'ناموجود', color: 'text-red-700', bg: 'bg-red-100' };

    // Sticky add-to-bar on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (cartButtonRef.current) {
                const offset = cartButtonRef.current.getBoundingClientRect().top;
                setIsSticky(offset < 0);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Carousel ref and scroll logic
    const carouselRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateCarouselButtons = () => {
        if (!carouselRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    };

    const scrollCarousel = (direction: 'left' | 'right') => {
        if (!carouselRef.current) return;
        const scrollAmount = 280;
        const newScrollLeft =
            carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
        carouselRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        setTimeout(updateCarouselButtons, 300);
    };

    // Inside component
    const { addItem } = useCartStore();

    // Then handle add to cart function
    const handleAddToCart = () => {
        if (product.stock > 0) {
            addItem(product, quantity);
            toast.success(`${product.name} به سبد خرید اضافه شد`);
        } else {
            toast.error('این محصول موجود نیست');
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100"
            dir="rtl"
        >
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 pt-6">
                <nav className="mb-4 flex items-center gap-2 text-sm">
                    <Link href="/" className="text-slate-500 transition hover:text-blue-600">
                        خانه
                    </Link>
                    <span className="text-slate-300">/</span>
                    <Link
                        href="/products"
                        className="text-slate-500 transition hover:text-blue-600"
                    >
                        محصولات
                    </Link>
                    <span className="text-slate-300">/</span>
                    <span className="font-medium text-slate-800">{product.name}</span>
                </nav>
            </div>

            {/* Main Product Section */}
            <div className="container mx-auto px-4 py-4 pb-12">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                    {/* Left: Image Gallery with zoom */}
                    <div className="group relative">
                        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl">
                            <div className="aspect-square overflow-hidden">
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center bg-slate-100">
                                        <Package size={80} className="text-slate-300" />
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Wishlist button over image */}
                        <button
                            onClick={() => setIsWishlisted(!isWishlisted)}
                            className="absolute top-4 right-4 rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm transition hover:scale-110"
                        >
                            <Heart
                                size={20}
                                className={
                                    isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600'
                                }
                            />
                        </button>
                    </div>

                    {/* Right: Product Info */}
                    <div className="space-y-6">
                        <div>
                            <div className="mb-2 flex flex-wrap items-center gap-3">
                                {category && (
                                    <Link
                                        href={`/categories/${category.slug}`}
                                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                                    >
                                        {category.name}
                                    </Link>
                                )}
                                {brand && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                        {brand.name}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl leading-tight font-extrabold text-slate-900 lg:text-4xl">
                                {product.name}
                            </h1>
                        </div>

                        {/* Rating placeholder */}
                        <div className="flex items-center gap-2">
                            <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" stroke="none" />
                                ))}
                            </div>
                            <span className="text-sm text-slate-500">(۱۲ نظر)</span>
                        </div>

                        {/* Price */}
                        <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 shadow-sm">
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-blue-700 lg:text-4xl">
                                    {formatPrice(product.price)}
                                </span>
                                <span className="text-sm text-slate-500">(قیمت نهایی)</span>
                            </div>
                            {/* Fake installment */}
                            <p className="mt-1 text-xs text-slate-500">امکان پرداخت اقساطی</p>
                        </div>

                        {/* Stock status */}
                        <div
                            className={`flex items-center gap-2 rounded-xl ${stockStatus.bg} border p-3`}
                        >
                            <Package size={18} className={stockStatus.color} />
                            <span className={`font-medium ${stockStatus.color}`}>
                                {stockStatus.label}
                            </span>
                            {product.stock > 0 && (
                                <span className="text-sm opacity-75">
                                    (تعداد موجود: {product.stock})
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                                <h3 className="mb-2 font-semibold text-slate-900">توضیحات محصول</h3>
                                <p className="leading-relaxed text-slate-600">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* Quantity selector + Add to cart */}
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center rounded-xl border border-slate-200 bg-white">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="rounded-r-xl px-3 py-2 text-slate-600 hover:bg-slate-50"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() =>
                                        setQuantity(Math.min(product.stock, quantity + 1))
                                    }
                                    className="rounded-l-xl px-3 py-2 text-slate-600 hover:bg-slate-50"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                disabled={product.stock === 0}
                                className={`flex-1 rounded-xl py-3 font-bold text-white shadow-md transition-all ${
                                    product.stock > 0
                                        ? 'transform bg-gradient-to-r from-blue-600 to-blue-700 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg'
                                        : 'cursor-not-allowed bg-slate-300'
                                }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <ShoppingCart size={18} />
                                    {product.stock > 0 ? 'افزودن به سبد خرید' : 'ناموجود'}
                                </div>
                            </button>
                        </div>

                        {/* Trust badges */}
                        <div className="grid grid-cols-3 gap-3 pt-4">
                            <div className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                                <Truck size={22} className="text-blue-600" />
                                <span className="text-xs text-slate-600">ارسال سریع</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                                <ShieldCheck size={22} className="text-green-600" />
                                <span className="text-xs text-slate-600">ضمانت اصالت</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                                <RefreshCw size={22} className="text-amber-600" />
                                <span className="text-xs text-slate-600">۷ روز گارانتی</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Carousel */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900">محصولات مشابه</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => scrollCarousel('left')}
                                    disabled={!canScrollLeft}
                                    className="rounded-full border border-slate-200 p-2 transition hover:bg-slate-100 disabled:opacity-50"
                                >
                                    <ChevronRight size={18} />
                                </button>
                                <button
                                    onClick={() => scrollCarousel('right')}
                                    disabled={!canScrollRight}
                                    className="rounded-full border border-slate-200 p-2 transition hover:bg-slate-100 disabled:opacity-50"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                            </div>
                        </div>
                        <div
                            ref={carouselRef}
                            onScroll={updateCarouselButtons}
                            className="flex gap-5 overflow-x-auto scroll-smooth pb-4"
                            style={{ scrollbarWidth: 'thin' }}
                        >
                            {relatedProducts.map((related) => {
                                // Using a simple card inside carousel (you can import ProductCard but we'll replicate style for consistency)
                                return (
                                    <Link
                                        key={related.id}
                                        href={`/products/${related.slug}`}
                                        className="group w-[220px] min-w-[220px] flex-shrink-0"
                                    >
                                        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
                                            <div className="aspect-square overflow-hidden bg-slate-100">
                                                {related.imageUrl ? (
                                                    <img
                                                        src={related.imageUrl}
                                                        alt={related.name}
                                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-slate-300">
                                                        <Package size={32} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-3">
                                                <h3 className="line-clamp-1 font-semibold text-slate-800">
                                                    {related.name}
                                                </h3>
                                                <p className="mt-1 text-lg font-bold text-blue-600">
                                                    {related.price.toLocaleString()} تومان
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Sticky Add-to-Cart Bar (on scroll) */}
            {isSticky && product.stock > 0 && (
                <div className="animate-slide-up fixed right-0 bottom-0 left-0 z-50 border-t border-slate-200 bg-white/95 py-3 shadow-lg backdrop-blur-md">
                    <div className="container mx-auto flex items-center justify-between gap-4 px-4">
                        <div className="hidden md:block">
                            <p className="font-bold text-slate-900">{product.name}</p>
                            <p className="text-lg font-bold text-blue-600">
                                {formatPrice(product.price)}
                            </p>
                        </div>
                        <div className="flex flex-1 items-center justify-end gap-3 md:flex-none">
                            <div className="flex items-center rounded-xl border border-slate-200 bg-white">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3 py-2 text-slate-600"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center">{quantity}</span>
                                <button
                                    onClick={() =>
                                        setQuantity(Math.min(product.stock, quantity + 1))
                                    }
                                    className="px-3 py-2 text-slate-600"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="rounded-xl bg-blue-600 px-6 py-2 font-bold text-white shadow-md"
                            >
                                افزودن به سبد
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Invisible anchor for sticky detection */}
            <div ref={cartButtonRef} className="h-1" />

            <ToastContainer />
        </div>
    );
}
