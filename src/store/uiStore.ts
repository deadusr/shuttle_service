import { create } from 'zustand';

interface UIState {
    isTripInfoPanelCollapsed: boolean;
    toggleTripInfoPanel: () => void;
    setTripInfoPanelCollapsed: (value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
    isTripInfoPanelCollapsed: false,
    toggleTripInfoPanel: () => set((state) => ({ isTripInfoPanelCollapsed: !state.isTripInfoPanelCollapsed })),
    setTripInfoPanelCollapsed: (value) => set({ isTripInfoPanelCollapsed: value }),
}));
