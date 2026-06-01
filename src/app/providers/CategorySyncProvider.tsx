// app/providers/CategorySyncProvider.tsx
'use client';
import { useCategoryStore } from '@/store/categoryStore';
import { useEffect } from 'react';

export default function CategorySyncProvider({ children }: { children: React.ReactNode }) {
    const fetchCategories = useCategoryStore((state) => state.fetchCategories);

    useEffect(() => {
        // Initial fetch
        fetchCategories();

        // Listen for updates from other tabs
        const handleUpdate = () => fetchCategories();
        window.addEventListener('categories-updated', handleUpdate);
        return () => window.removeEventListener('categories-updated', handleUpdate);
    }, [fetchCategories]);

    return <>{children}</>;
}