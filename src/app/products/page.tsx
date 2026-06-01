'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import {
    Search,
    Filter,
    X,
    ChevronDown,
    ArrowUpDown,
    Tag,
    Package,
    DollarSign,
    Grid3X3,
    List,
} from 'lucide-react';
import { useProductStore } from '@/store/productStore';
import { useCategoryStore } from '@/store/categoryStore';

type SortOption = 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc' | 'newest';
type StockFilter = 'all' | 'in_stock' | 'out_of_stock';

export default function ProductsPage() {
    const { products } = useProductStore();
    const { categories } = useCategoryStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [stockFilter, setStockFilter] = useState<StockFilter>('all');
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const productList = Array.isArray(products) ? products : [];
    const categoryList = Array.isArray(categories) ? categories : [];

    // Filtering logic (same)
    const filteredProducts = useMemo(() => {
        let filtered = [...productList];
        if (searchTerm.trim()) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (selectedCategoryId !== 'all') {
            filtered = filtered.filter(p => p.categoryId === selectedCategoryId);
        }
        if (minPrice) {
            filtered = filtered.filter(p => p.price >= Number(minPrice));
        }
        if (maxPrice) {
            filtered = filtered.filter(p => p.price <= Number(maxPrice));
        }
        if (stockFilter === 'in_stock') {
            filtered = filtered.filter(p => p.stock > 0);
        } else if (stockFilter === 'out_of_stock') {
            filtered = filtered.filter(p => p.stock === 0);
        }
        return filtered;
    }, [productList, searchTerm, selectedCategoryId, minPrice, maxPrice, stockFilter]);

    // Sorting logic (same)
    const sortedProducts = useMemo(() => {
        const sorted = [...filteredProducts];
        switch (sortBy) {
            case 'name_asc':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name_desc':
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price_asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
                break;
        }
        return sorted;
    }, [filteredProducts, sortBy]);

    const totalItems = sortedProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedProducts = sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleFilterChange = () => setCurrentPage(1);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategoryId('all');
        setMinPrice('');
        setMaxPrice('');
        setStockFilter('all');
        setSortBy('newest');
        setCurrentPage(1);
    };

    const hasActiveFilters = searchTerm || selectedCategoryId !== 'all' || minPrice || maxPrice || stockFilter !== 'all';

    // Helper to get category name
    const getCategoryName = (id: string) => {
        const cat = categoryList.find(c => c.id === id);
        return cat?.name || id;
    };

    return (
        <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen py-8" dir="rtl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero / Title */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">محصولات</h1>
                    <p className="mt-2 text-slate-500">بهترین بلبرینگ‌های صنعتی و خودرو با بالاترین کیفیت</p>
                </div>

                {/* Filter Bar (desktop always, mobile toggle) */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm lg:hidden"
                    >
                        <Filter size={16} />
                        {showFilters ? 'بستن فیلترها' : 'فیلترها'}
                        <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`rounded-xl p-2 transition ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-white text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <Grid3X3 size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`rounded-xl p-2 transition ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-white text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>

                {/* Filters Panel */}
                <div className={`mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all ${showFilters ? 'block' : 'hidden lg:block'}`}>
                    <div className="flex flex-wrap items-end gap-4">
                        {/* Search */}
                        <div className="flex-1 min-w-[180px]">
                            <label className="mb-1 block text-sm font-medium text-slate-700">جستجو</label>
                            <div className="relative">
                                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); handleFilterChange(); }}
                                    className="w-full rounded-xl border border-slate-200 py-2.5 pr-10 pl-3 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                                    placeholder="نام محصول..."
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="min-w-[160px]">
                            <label className="mb-1 block text-sm font-medium text-slate-700">دسته‌بندی</label>
                            <select
                                value={selectedCategoryId}
                                onChange={(e) => { setSelectedCategoryId(e.target.value); handleFilterChange(); }}
                                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-400"
                            >
                                <option value="all">همه</option>
                                {categoryList.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Min Price */}
                        <div className="min-w-[140px]">
                            <label className="mb-1 block text-sm font-medium text-slate-700">حداقل قیمت</label>
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => { setMinPrice(e.target.value); handleFilterChange(); }}
                                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-400"
                                placeholder="۰ تومان"
                            />
                        </div>

                        {/* Max Price */}
                        <div className="min-w-[140px]">
                            <label className="mb-1 block text-sm font-medium text-slate-700">حداکثر قیمت</label>
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => { setMaxPrice(e.target.value); handleFilterChange(); }}
                                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-400"
                                placeholder="نامحدود"
                            />
                        </div>

                        {/* Stock */}
                        <div className="min-w-[130px]">
                            <label className="mb-1 block text-sm font-medium text-slate-700">موجودی</label>
                            <select
                                value={stockFilter}
                                onChange={(e) => { setStockFilter(e.target.value as StockFilter); handleFilterChange(); }}
                                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-400"
                            >
                                <option value="all">همه</option>
                                <option value="in_stock">موجود</option>
                                <option value="out_of_stock">ناموجود</option>
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="min-w-[170px]">
                            <label className="mb-1 block text-sm font-medium text-slate-700">مرتب‌سازی</label>
                            <div className="relative">
                                <ArrowUpDown className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="w-full appearance-none rounded-xl border border-slate-200 px-3 py-2.5 pl-8 outline-none focus:border-blue-400"
                                >
                                    <option value="newest">جدیدترین</option>
                                    <option value="name_asc">نام (الف تا ی)</option>
                                    <option value="name_desc">نام (ی تا الف)</option>
                                    <option value="price_asc">قیمت (کم به زیاد)</option>
                                    <option value="price_desc">قیمت (زیاد به کم)</option>
                                </select>
                            </div>
                        </div>

                        {/* Clear filters */}
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-1 rounded-xl bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                            >
                                <X size={14} /> حذف
                            </button>
                        )}
                    </div>
                </div>

                {/* Results info & per-page */}
                <div className="mb-6 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Package size={16} />
                        <span>{totalItems} محصول</span>
                        {hasActiveFilters && (
                            <button onClick={clearFilters} className="text-blue-600 hover:underline">(حذف فیلترها)</button>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-500">نمایش:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                            className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-blue-400"
                        >
                            <option value={12}>۱۲</option>
                            <option value={24}>۲۴</option>
                            <option value={48}>۴۸</option>
                        </select>
                        <span className="text-sm text-slate-500">عدد در صفحه</span>
                    </div>
                </div>

                {/* Products Grid/List */}
                {paginatedProducts.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                            <Package size={32} className="text-slate-400" />
                        </div>
                        <p className="text-slate-500">محصولی با این مشخصات یافت نشد.</p>
                        {hasActiveFilters && (
                            <button onClick={clearFilters} className="mt-3 text-blue-600 hover:underline">
                                حذف فیلترها
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {paginatedProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {paginatedProducts.map(product => (
                                    <div key={product.id} className="flex flex-wrap gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                                            {product.imageUrl ? (
                                                <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-slate-300">
                                                    <Package size={24} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-slate-800">{product.name}</h3>
                                            <p className="mt-1 text-sm text-slate-500 line-clamp-1">{product.description}</p>
                                            <div className="mt-2 flex flex-wrap items-center gap-3">
                                                <span className="text-lg font-bold text-blue-600">{product.price.toLocaleString()} تومان</span>
                                                <span className="text-xs text-slate-400">موجودی: {product.stock}</span>
                                                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {product.stock > 0 ? 'موجود' : 'ناموجود'}
                                                </span>
                                                <span className="text-xs text-slate-400">دسته: {getCategoryName(product.categoryId)}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">افزودن به سبد</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-10 flex flex-wrap justify-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium disabled:opacity-50 hover:bg-slate-50"
                                >
                                    قبلی
                                </button>
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) pageNum = i + 1;
                                    else if (currentPage <= 3) pageNum = i + 1;
                                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                                    else pageNum = currentPage - 2 + i;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`min-w-[40px] rounded-xl px-3 py-2 text-sm font-medium transition ${currentPage === pageNum
                                                    ? 'bg-blue-600 text-white shadow-md'
                                                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium disabled:opacity-50 hover:bg-slate-50"
                                >
                                    بعدی
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}