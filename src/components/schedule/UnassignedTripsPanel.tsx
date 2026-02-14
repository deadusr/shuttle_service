import { useState, useMemo } from 'react';
import { Icon } from '../icons';
import { useUIStore } from '../../store/uiStore';
import { mockUnassignedTrips } from '../../data/mockUnassignedTrips';
import type { UnassignedTrip } from '../../data/mockUnassignedTrips';

interface TripChipProps {
    trip: UnassignedTrip;
    isActive: boolean;
    onClick: () => void;
}

const TripChip = ({ trip, isActive, onClick }: TripChipProps) => {
    const isForward = trip.destination === 'СПБ';

    const borderClass = isActive
        ? (isForward ? 'border-direction-forward' : 'border-direction-return')
        : 'border-gray-300 border-dashed';


    return (
        <div
            onClick={onClick}
            className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 select-none border ${borderClass} bg-white hover:shadow-sm`}
        >
            {trip.isSpecial && (
                <span className="text-amber-500 text-xs">✦</span>
            )}
            <span className="text-gray-900">{trip.time}</span>
            <div className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded ${isForward ? 'bg-direction-forward-light text-direction-forward' : 'bg-direction-return-light text-direction-return'}`}>
                <span className="text-sm font-medium">➔ {trip.destination}</span>
            </div>
        </div>
    );
};

const UnassignedTripsPanel = () => {
    const { isUnassignedPanelCollapsed, toggleUnassignedPanel } = useUIStore();
    const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set(['Понедельник']));
    const [activeTripId, setActiveTripId] = useState<string | null>(null);

    const totalTrips = useMemo(() => {
        return mockUnassignedTrips.reduce((sum, day) => sum + day.trips.length, 0);
    }, []);

    const toggleDay = (day: string) => {
        setExpandedDays(prev => {
            const next = new Set(prev);
            if (next.has(day)) {
                next.delete(day);
            } else {
                next.add(day);
            }
            return next;
        });
    };

    const handleTripClick = (tripId: string) => {
        setActiveTripId(prev => prev === tripId ? null : tripId);
    };

    if (isUnassignedPanelCollapsed) {
        return (
            <div className="fixed top-0 right-0 h-screen w-16 bg-white border-l border-gray-200 flex flex-col items-center py-4 z-40 transition-all duration-300">
                <button
                    onClick={toggleUnassignedPanel}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors cursor-pointer"
                >
                    <Icon name="dock-left" className="w-6 h-6 rotate-180" />
                </button>
            </div>
        );
    }

    return (
        <div className="fixed top-0 right-0 h-screen w-[380px] bg-white border-l border-gray-200 flex flex-col z-40 transition-all duration-300 shadow-xl overflow-hidden font-sans">
            {/* Collapse Toggle */}
            <div className="px-4 pt-4 shrink-0">
                <button
                    onClick={toggleUnassignedPanel}
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                    <Icon name="dock-left" className="w-5 h-5" />
                </button>
            </div>

            {/* Header */}
            <div className="px-6 pt-2 pb-4 flex items-center justify-between shrink-0">
                <h2 className="text-xl font-semibold text-gray-900">
                    Неназначенные ({totalTrips})
                </h2>
                <button
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-colors cursor-pointer"
                    title="Добавить рейс"
                >
                    <Icon name="add-circle" className="w-5 h-5" />
                </button>
            </div>

            {/* Days list */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-hidden">
                <div className="flex flex-col">
                    {mockUnassignedTrips.map((dayData) => {
                        const isExpanded = expandedDays.has(dayData.day);
                        const spbTrips = dayData.trips.filter(t => t.destination === 'СПБ');
                        const borTrips = dayData.trips.filter(t => t.destination === 'БОР');

                        return (
                            <div key={dayData.day} className="border-b border-gray-100 last:border-b-0">
                                {/* Day header */}
                                <button
                                    onClick={() => toggleDay(dayData.day)}
                                    className="w-full flex items-center justify-between py-4 text-left cursor-pointer group hover:bg-gray-50/50 transition-colors rounded-lg -mx-1 px-1"
                                >
                                    <span className="text-base text-gray-700 font-normal">
                                        {dayData.day} ({dayData.trips.length})
                                    </span>
                                    <Icon
                                        name="chevron-circle"
                                        direction={isExpanded ? 'up' : 'right'}
                                        className={`w-6 h-6 transition-colors ${isExpanded ? 'text-gray-600' : 'text-gray-300 group-hover:text-gray-400'}`}
                                    />
                                </button>

                                {/* Trip chips - two columns (animated) */}
                                <div
                                    className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                                    style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
                                >
                                    <div className="overflow-hidden">
                                        <div className="grid grid-cols-2 gap-3 pb-5 pt-1">
                                            {/* Left column: СПБ */}
                                            <div className="flex flex-col gap-2">
                                                {spbTrips.map((trip) => (
                                                    <TripChip
                                                        key={trip.id}
                                                        trip={trip}
                                                        isActive={activeTripId === trip.id}
                                                        onClick={() => handleTripClick(trip.id)}
                                                    />
                                                ))}
                                            </div>
                                            {/* Right column: БОР */}
                                            <div className="flex flex-col gap-2">
                                                {borTrips.map((trip) => (
                                                    <TripChip
                                                        key={trip.id}
                                                        trip={trip}
                                                        isActive={activeTripId === trip.id}
                                                        onClick={() => handleTripClick(trip.id)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default UnassignedTripsPanel;

