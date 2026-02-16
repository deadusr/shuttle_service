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
    highlightedTripId: string | null;
    setHighlightedTripId: (id: string | null) => void;
    draggedTripId: string | null;
    setDraggedTripId: (id: string | null) => void;
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
    highlightedTripId: null,
    setHighlightedTripId: (id) => set({ highlightedTripId: id }),
    draggedTripId: null,
    setDraggedTripId: (id) => set({ draggedTripId: id }),
}));

export const LAYOUT_SIZES = {
    SIDEBAR_WIDTH: '72px',
    TRIP_PANEL_COLLAPSED: '64px',
    TRIP_PANEL_EXPANDED: '472px',
    UNASSIGNED_PANEL_COLLAPSED: '64px',
    UNASSIGNED_PANEL_EXPANDED: '380px',
} as const;
