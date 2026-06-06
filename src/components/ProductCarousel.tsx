// components/ProductCarousel.tsx
'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/store/productStore';

interface ProductCarouselProps {
    title: string;
    products: Product[];
}

export default function ProductCarousel({ title, products }: ProductCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = 300;
        const newScrollLeft =
            scrollContainerRef.current.scrollLeft +
            (direction === 'left' ? -scrollAmount : scrollAmount);
        scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        updateScrollButtons();
    };

    const updateScrollButtons = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    };

    if (!products.length) return null;

    return (
        <div className="my-8">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className="rounded-full border border-slate-200 p-2 hover:bg-slate-50 disabled:opacity-50"
                    >
                        <ChevronRight size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className="rounded-full border border-slate-200 p-2 hover:bg-slate-50 disabled:opacity-50"
                    >
                        <ChevronLeft size={20} />
                    </button>
                </div>
            </div>
            <div
                ref={scrollContainerRef}
                onScroll={updateScrollButtons}
                className="flex gap-5 overflow-x-auto scroll-smooth pb-4"
                style={{ scrollbarWidth: 'thin', msOverflowStyle: 'auto' }}
            >
                {products.map((product) => (
                    <div key={product.id} className="w-[250px] min-w-[250px] flex-shrink-0">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}
