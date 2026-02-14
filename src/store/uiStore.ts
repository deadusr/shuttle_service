import { create } from 'zustand';

interface UIState {
    isTripInfoPanelCollapsed: boolean;
    toggleTripInfoPanel: () => void;
    setTripInfoPanelCollapsed: (value: boolean) => void;
    isUnassignedPanelCollapsed: boolean;
    toggleUnassignedPanel: () => void;
    setUnassignedPanelCollapsed: (value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
    isTripInfoPanelCollapsed: false,
    toggleTripInfoPanel: () => set((state) => ({ isTripInfoPanelCollapsed: !state.isTripInfoPanelCollapsed })),
    setTripInfoPanelCollapsed: (value) => set({ isTripInfoPanelCollapsed: value }),
    isUnassignedPanelCollapsed: false,
    toggleUnassignedPanel: () => set((state) => ({ isUnassignedPanelCollapsed: !state.isUnassignedPanelCollapsed })),
    setUnassignedPanelCollapsed: (value) => set({ isUnassignedPanelCollapsed: value }),
}));
