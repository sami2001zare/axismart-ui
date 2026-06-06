// stores/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './productStore';

export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    stock: number;
    slug: string;
}

interface CartState {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product, quantity = 1) => {
                const existingItem = get().items.find((item) => item.productId === product.id);
                if (existingItem) {
                    const newQuantity = Math.min(existingItem.quantity + quantity, product.stock);
                    set({
                        items: get().items.map((item) =>
                            item.productId === product.id
                                ? { ...item, quantity: newQuantity }
                                : item
                        ),
                    });
                } else {
                    set({
                        items: [
                            ...get().items,
                            {
                                productId: product.id,
                                name: product.name,
                                price: product.price,
                                quantity: Math.min(quantity, product.stock),
                                imageUrl: product.imageUrl,
                                stock: product.stock,
                                slug: product.slug,
                            },
                        ],
                    });
                }
            },

            removeItem: (productId) => {
                set({ items: get().items.filter((item) => item.productId !== productId) });
            },

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }
                const item = get().items.find((i) => i.productId === productId);
                if (item) {
                    const validQuantity = Math.min(quantity, item.stock);
                    set({
                        items: get().items.map((item) =>
                            item.productId === productId
                                ? { ...item, quantity: validQuantity }
                                : item
                        ),
                    });
                }
            },

            clearCart: () => set({ items: [] }),

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
