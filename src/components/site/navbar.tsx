// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCategoryStore } from '@/store/categoryStore';

export default function Navbar() {
    const { categories } = useCategoryStore();
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

    useEffect(() => {
        // If categories not already loaded, load them
        // if (categories.length === 0 && fetchCategories) {
        if (categories.length === 0) {
            // Our categoryStore has no fetchCategories because it's local; it's already populated.
            // So we can just use categories as is.
        }
    }, []);

    const categoryList = Array.isArray(categories) ? categories : [];

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <Link href="/" className="text-xl font-bold text-blue-600">
                    بلبرینگ پارسا
                </Link>

                <ul className="flex items-center gap-6 text-slate-700">
                    <li>
                        <Link href="/" className="hover:text-blue-600">
                            خانه
                        </Link>
                    </li>
                    <li>
                        <Link href="/products" className="hover:text-blue-600">
                            محصولات
                        </Link>
                    </li>

                    {/* Categories Dropdown */}
                    <li className="relative">
                        <button
                            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                            className="flex items-center gap-1 hover:text-blue-600"
                        >
                            دسته‌بندی‌ها
                            <ChevronDown
                                size={16}
                                className={`transition ${isCategoriesOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {isCategoriesOpen && categoryList.length > 0 && (
                            <div className="absolute right-0 z-10 mt-2 w-48 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                                {categoryList.map((cat) => (
                                    <Link
                                        key={cat.id}
                                        href={`/categories/${cat.slug}`}
                                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                        onClick={() => setIsCategoriesOpen(false)}
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </li>

                    <li>
                        <Link href="/contact" className="hover:text-blue-600">
                            تماس با ما
                        </Link>
                    </li>
                </ul>

                <div className="flex items-center gap-4">
                    <Link href="/cart" className="text-slate-700 hover:text-blue-600">
                        سبد خرید
                    </Link>
                    <Link
                        href="/login"
                        className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        ورود
                    </Link>
                </div>
            </div>
        </nav>
    );
}
