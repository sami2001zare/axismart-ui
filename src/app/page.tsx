'use client';

import Navbar from '@/components/site/navbar';
import Hero from '@/components/site/hero';
import CategoriesSection from '@/components/site/categories';
import FeaturedProducts from '@/components/site/featured-products';
import WholesaleSection from '@/components/site/wholesale';
import WhyAxisMart from '@/components/site/why-axismart';
import BrandsSection from '@/components/site/brands';
import Testimonials from '@/components/site/testimonials';
import CtaBanner from '@/components/site/cta-banner';
import Footer from '@/components/site/footer';
import { useCategoryStore } from '@/store/categoryStore';
import { useProductStore } from '@/store/productStore';
import { useMemo } from 'react';
import ProductCarousel from '@/components/ProductCarousel';

export default function HomePage() {
    const { categories } = useCategoryStore();
    const { products } = useProductStore();

    const productList = useMemo(() => (Array.isArray(products) ? products : []), [products]);
    const categoryList = useMemo(() => (Array.isArray(categories) ? categories : []), [categories]);

    // Group products by category
    const productsByCategory = useMemo(() => {
        const map: Record<string, typeof productList> = {};
        productList.forEach((product) => {
            if (!map[product.categoryId]) map[product.categoryId] = [];
            map[product.categoryId].push(product);
        });
        return map;
    }, [productList]);

    // Get first 3 categories that have at least one product
    const activeCategories = categoryList
        .filter((cat) => productsByCategory[cat.id]?.length > 0)
        .slice(0, 3);

    return (
        <>
            <Navbar />
            <Hero />
            <CategoriesSection />
            {/* Carousels for each category */}
            <section className="relative">
                <div className="mx-auto max-w-[1450px] px-8">
                    {activeCategories.map((category) => {
                        const categoryProducts = productsByCategory[category.id] || [];
                        return (
                            <ProductCarousel
                                key={category.id}
                                title={category.name}
                                products={categoryProducts}
                            />
                        );
                    })}
                </div>
            </section>
            <FeaturedProducts />
            <WholesaleSection />
            <WhyAxisMart />
            <BrandsSection />
            <Testimonials />
            <CtaBanner />
            <Footer />
        </>
    );
}
