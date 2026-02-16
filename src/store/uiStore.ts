import { create } from 'zustand';
import { Trip } from '../types';

interface UIState {
    isTripInfoPanelCollapsed: boolean;
    toggleTripInfoPanel: () => void;
    setTripInfoPanelCollapsed: (value: boolean) => void;
    selectedTrip: Trip | null;
    setSelectedTrip: (trip: Trip | null) => void;
    isUnassignedPanelCollapsed: boolean;
    toggleUnassignedPanel: () => void;
    setUnassignedPanelCollapsed: (value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
    isTripInfoPanelCollapsed: true,
    toggleTripInfoPanel: () => set((state) => ({ isTripInfoPanelCollapsed: !state.isTripInfoPanelCollapsed })),
    setTripInfoPanelCollapsed: (value) => set({ isTripInfoPanelCollapsed: value }),
    selectedTrip: null,
    setSelectedTrip: (trip) => set({ selectedTrip: trip }),
    isUnassignedPanelCollapsed: true,
    toggleUnassignedPanel: () => set((state) => ({ isUnassignedPanelCollapsed: !state.isUnassignedPanelCollapsed })),
    setUnassignedPanelCollapsed: (value) => set({ isUnassignedPanelCollapsed: value }),
}));
