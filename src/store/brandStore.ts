// stores/brandStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Brand {
    id: string;
    name: string;
    slug: string;
    logo?: string;      // optional logo URL
    description?: string;
}

interface BrandState {
    brands: Brand[];
    addBrand: (brand: Omit<Brand, 'id'>) => void;
    updateBrand: (id: string, data: Partial<Brand>) => void;
    deleteBrand: (id: string) => void;
    setBrands: (brands: Brand[]) => void;
}

// Initial mock brands
const initialBrands: Brand[] = [
    { id: '1', name: 'SKF', slug: 'skf', description: 'تولیدکننده معتبر بلبرینگ‌های صنعتی' },
    { id: '2', name: 'FAG', slug: 'fag', description: 'برند آلمانی بلبرینگ‌های خودرو' },
];

export const useBrandStore = create<BrandState>()(
    persist(
        (set) => ({
            brands: initialBrands,

            addBrand: (brand) =>
                set((state) => ({
                    brands: [
                        ...state.brands,
                        { ...brand, id: Date.now().toString() },
                    ],
                })),

            updateBrand: (id, data) =>
                set((state) => ({
                    brands: state.brands.map((b) =>
                        b.id === id ? { ...b, ...data } : b
                    ),
                })),

            deleteBrand: (id) =>
                set((state) => ({
                    brands: state.brands.filter((b) => b.id !== id),
                })),

            setBrands: (brands) => set({ brands }),
        }),
        {
            name: 'brand-storage',
        }
    )
);