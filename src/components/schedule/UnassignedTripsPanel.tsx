import { useState, useMemo } from 'react';
import { Icon } from '../icons';
import { useUIStore } from '../../store/uiStore';
import { useUnassignedTrips } from '../../hooks/useTrips';
import { startOfWeek, endOfWeek, format, eachDayOfInterval } from 'date-fns';
import SidePanel from '../common/SidePanel';
import DaySection from './DaySection';
import type { UnassignedTrip } from '../../types';

interface UnassignedTripsPanelProps {
    currentDate: Date;
}

const UnassignedTripsPanel = ({ currentDate }: UnassignedTripsPanelProps) => {
    const { isUnassignedPanelCollapsed, toggleUnassignedPanel } = useUIStore();

    const { weekStart, weekEnd, daysOfWeek } = useMemo(() => {
        const start = startOfWeek(currentDate, { weekStartsOn: 1 });
        const end = endOfWeek(currentDate, { weekStartsOn: 1 });
        return {
            weekStart: start,
            weekEnd: end,
            daysOfWeek: eachDayOfInterval({ start, end }),
        };
    }, [currentDate]);

    const [expandedDays, setExpandedDays] = useState<Set<string>>(() => {
        return new Set([format(currentDate, 'yyyy-MM-dd')]);
    });

    const [activeTripId, setActiveTripId] = useState<string | null>(null);

    const { data: trips = [] } = useUnassignedTrips(
        weekStart.toISOString(), weekEnd.toISOString()
    );

    const tripsByDay = useMemo(() => {
        const grouped = new Map<string, UnassignedTrip[]>();
        daysOfWeek.forEach(day => {
            const dayKey = format(day, 'yyyy-MM-dd');
            grouped.set(dayKey, []);
        });

        trips.forEach(trip => {
            const tripDate = format(trip.departure, 'yyyy-MM-dd');
            if (grouped.has(tripDate)) {
                grouped.get(tripDate)?.push(trip);
            }
        });
        return grouped;
    }, [trips, daysOfWeek]);

    const totalTrips = trips.length;

    const toggleDay = (dateKey: string) => {
        setExpandedDays(prev => {
            const next = new Set(prev);
            if (next.has(dateKey)) {
                next.delete(dateKey);
            } else {
                next.add(dateKey);
            }
            return next;
        });
    };

    const handleTripClick = (tripId: string) => {
        setActiveTripId(prev => prev === tripId ? null : tripId);
    };

    return (
        <SidePanel
            isCollapsed={isUnassignedPanelCollapsed}
            onToggle={toggleUnassignedPanel}
            width="380px"
        >
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
                    {daysOfWeek.map((dayDate) => {
                        const dateKey = format(dayDate, 'yyyy-MM-dd');
                        const dayTrips = tripsByDay.get(dateKey) || [];

                        return (
                            <DaySection
                                key={dateKey}
                                dayDate={dayDate}
                                trips={dayTrips}
                                isExpanded={expandedDays.has(dateKey)}
                                onToggle={() => toggleDay(dateKey)}
                                activeTripId={activeTripId}
                                onTripClick={handleTripClick}
                            />
                        );
                    })}
                </div>
            </div>
        </SidePanel>
    );
};

export default UnassignedTripsPanel;
