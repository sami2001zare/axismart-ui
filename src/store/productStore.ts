// stores/productStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
    id: string;
    name: string;
    slug: string;
    categoryId: string; // reference to category id
    brandId: string; // reference to brand id
    price: number;
    stock: number;
    description: string;
    imageUrl?: string;
    createdAt: string;
}

interface ProductState {
    products: Product[];
    addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
    updateProduct: (id: string, data: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    getProductBySlug: (slug: string) => Product | undefined;
}

export const useProductStore = create<ProductState>()(
    persist(
        (set, get) => ({
            products: [],

            addProduct: (product) => {
                const newProduct: Product = {
                    ...product,
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                };
                set((state) => ({
                    products: [...state.products, newProduct],
                }));
            },

            updateProduct: (id, data) =>
                set((state) => ({
                    products: state.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
                })),

            deleteProduct: (id) =>
                set((state) => ({
                    products: state.products.filter((p) => p.id !== id),
                })),

            getProductBySlug: (slug) => {
                return get().products.find((p) => p.slug === slug);
            },
        }),
        {
            name: 'product-storage',
        }
    )
);
