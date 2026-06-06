// stores/uiStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UiState {
    sidebarExpanded: boolean;
    toggleSidebar: () => void;
    setSidebarExpanded: (expanded: boolean) => void;
}

const useUiStore = create<UiState>()(
    persist(
        (set) => ({
            sidebarExpanded: true,
            toggleSidebar: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded })),
            setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }),
        }),
        {
            name: 'ui-storage', // persists in localStorage
        }
    )
);

export default useUiStore;
