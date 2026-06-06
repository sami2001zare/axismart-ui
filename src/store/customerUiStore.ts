// stores/customerUiStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CustomerUiState {
    sidebarExpanded: boolean;
    toggleSidebar: () => void;
    setSidebarExpanded: (expanded: boolean) => void;
}

export const useCustomerUiStore = create<CustomerUiState>()(
    persist(
        (set) => ({
            sidebarExpanded: true,
            toggleSidebar: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded })),
            setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }),
        }),
        {
            name: 'customer-ui-storage',
        }
    )
);
