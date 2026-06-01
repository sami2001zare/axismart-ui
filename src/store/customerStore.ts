// stores/customerStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate?: string;
    status: 'active' | 'inactive';
    createdAt: string;
}

interface CustomerState {
    customers: Customer[];
    addCustomer: (customer: Omit<Customer, 'id' | 'createdAt' | 'totalOrders' | 'totalSpent' | 'status'>) => void;
    updateCustomer: (id: string, data: Partial<Customer>) => void;
    deleteCustomer: (id: string) => void;
}

const initialCustomers: Customer[] = [
    {
        id: '1',
        name: 'علی محمدی',
        email: 'ali@example.com',
        phone: '09123456789',
        address: 'تهران، خیابان آزادی',
        totalOrders: 5,
        totalSpent: 1250000,
        lastOrderDate: '2024-01-15',
        status: 'active',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'سارا حسینی',
        email: 'sara@example.com',
        phone: '09234567890',
        address: 'اصفهان، خیابان نقش جهان',
        totalOrders: 3,
        totalSpent: 780000,
        lastOrderDate: '2024-02-10',
        status: 'active',
        createdAt: new Date().toISOString(),
    },
    {
        id: '3',
        name: 'رضا کریمی',
        email: 'reza@example.com',
        phone: '09345678901',
        address: 'شیراز، خیابان زند',
        totalOrders: 0,
        totalSpent: 0,
        lastOrderDate: undefined,
        status: 'inactive',
        createdAt: new Date().toISOString(),
    },
];

export const useCustomerStore = create<CustomerState>()(
    persist(
        (set) => ({
            customers: initialCustomers,

            addCustomer: (customer) =>
                set((state) => ({
                    customers: [
                        ...state.customers,
                        {
                            ...customer,
                            id: Date.now().toString(),
                            totalOrders: 0,
                            totalSpent: 0,
                            status: 'inactive',
                            createdAt: new Date().toISOString(),
                        },
                    ],
                })),

            updateCustomer: (id, data) =>
                set((state) => ({
                    customers: state.customers.map((c) =>
                        c.id === id ? { ...c, ...data } : c
                    ),
                })),

            deleteCustomer: (id) =>
                set((state) => ({
                    customers: state.customers.filter((c) => c.id !== id),
                })),
        }),
        {
            name: 'customer-storage',
        }
    )
);