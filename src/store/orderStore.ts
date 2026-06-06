// stores/orderStore.ts (updated)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    customerId: string;
    customerName?: string; // for display
    items: OrderItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
}

interface OrderState {
    orders: Order[];
    addOrder: (order: Omit<Order, 'id'>) => void;
    updateOrderStatus: (id: string, status: Order['status']) => void;
}

// Helper to generate random items
const generateMockItems = (): OrderItem[] => {
    const productNames = [
        'بلبرینگ SKF 6204',
        'بلبرینگ FAG 6305',
        'بلبرینگ صنعتی NSK',
        'بلبرینگ خودرو کیا',
    ];
    const numItems = Math.floor(Math.random() * 3) + 1;
    return Array.from({ length: numItems }).map(() => ({
        productId: Math.random().toString(),
        productName: productNames[Math.floor(Math.random() * productNames.length)],
        quantity: Math.floor(Math.random() * 10) + 1,
        price: Math.floor(Math.random() * 500000) + 100000,
    }));
};

// Generate mock orders (50)
const generateMockOrders = (): Order[] => {
    const statuses: Order['status'][] = [
        'pending',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
    ];
    const customerIds = ['1', '2', '3'];
    const customerNames = ['علی محمدی', 'سارا حسینی', 'رضا کریمی'];
    const orders: Order[] = [];

    for (let i = 0; i < 50; i++) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 180));
        const randomCustomerIndex = Math.floor(Math.random() * customerIds.length);
        const items = generateMockItems();
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        orders.push({
            id: `ORD-${1000 + i}`,
            customerId: customerIds[randomCustomerIndex],
            customerName: customerNames[randomCustomerIndex],
            items,
            total,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            createdAt: date.toISOString(),
        });
    }
    return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            orders: generateMockOrders(),
            addOrder: (order) =>
                set((state) => ({
                    orders: [{ ...order, id: `ORD-${Date.now()}` }, ...state.orders],
                })),
            updateOrderStatus: (id, status) =>
                set((state) => ({
                    orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
                })),
        }),
        {
            name: 'order-storage',
        }
    )
);
