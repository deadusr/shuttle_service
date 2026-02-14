import { create } from 'zustand';

interface UIState {
    isPassengerPanelCollapsed: boolean;
    togglePassengerPanel: () => void;
    setPassengerPanelCollapsed: (value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
    isPassengerPanelCollapsed: false,
    togglePassengerPanel: () => set((state) => ({ isPassengerPanelCollapsed: !state.isPassengerPanelCollapsed })),
    setPassengerPanelCollapsed: (value) => set({ isPassengerPanelCollapsed: value }),
}));
