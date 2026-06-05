// stores/customerStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    totalOrders: number;
    totalSpent: number;
    wishlistCount: number;
    pendingOrders: number;
}

const initialCustomer: Customer = {
    id: '1',
    name: 'سامان زارع',
    email: 'saman@axismart.com',
    phone: '09123456789',
    totalOrders: 24,
    totalSpent: 12_450_000,
    wishlistCount: 8,
    pendingOrders: 2,
};

export const useCustomerStoreI = create<{ customer: Customer }>()(
    persist(
        () => ({
            customer: initialCustomer,
        }),
        {
            name: 'customer-storage',
        }
    )
);