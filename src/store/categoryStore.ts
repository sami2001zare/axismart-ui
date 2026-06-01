// stores/categoryStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    count?: number;
}

interface CategoryState {
    categories: Category[];
    addCategory: (category: Omit<Category, 'id'>) => void;
    updateCategory: (id: string, data: Partial<Category>) => void;
    deleteCategory: (id: string) => void;
    setCategories: (categories: Category[]) => void;
}

// Initial mock data (you can change or remove)
const initialCategories: Category[] = [
    { id: '1', name: 'بلبرینگ‌های صنعتی', slug: 'industrial-bearings', description: 'بلبرینگ‌های سنگین برای ماشین‌آلات', count: 42 },
    { id: '2', name: 'بلبرینگ‌های خودرو', slug: 'auto-bearings', description: 'مناسب برای انواع خودرو', count: 128 },
];

export const useCategoryStore = create<CategoryState>()(
    persist(
        (set) => ({
            categories: initialCategories,     // always an array

            addCategory: (category) =>
                set((state) => ({
                    categories: [
                        ...state.categories,
                        { ...category, id: Date.now().toString() }, // simple ID generator
                    ],
                })),

            updateCategory: (id, data) =>
                set((state) => ({
                    categories: state.categories.map((cat) =>
                        cat.id === id ? { ...cat, ...data } : cat
                    ),
                })),

            deleteCategory: (id) =>
                set((state) => ({
                    categories: state.categories.filter((cat) => cat.id !== id),
                })),

            setCategories: (categories) => set({ categories }),
        }),
        {
            name: 'category-storage',      // saves to localStorage, so data survives refresh
        }
    )
);