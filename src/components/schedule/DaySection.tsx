import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Icon } from '../icons';
import { DraggableTripChip } from './cards/DraggableTripChip';
import { capitalize } from '../../utils/string';
import type { UnassignedTrip } from '../../types';

interface DaySectionProps {
    dayDate: Date;
    trips: UnassignedTrip[];
    isExpanded: boolean;
    onToggle: () => void;
    activeTripId: string | null;
    onTripClick: (id: string) => void;
}

const DaySection = ({ dayDate, trips, isExpanded, onToggle, activeTripId, onTripClick }: DaySectionProps) => {
    const dayName = capitalize(format(dayDate, 'eeee', { locale: ru }));

    const tripsByRoute = trips.reduce((acc, trip) => {
        const routeId = trip.route.id;
        if (!acc[routeId]) {
            acc[routeId] = [];
        }
        acc[routeId].push(trip);
        return acc;
    }, {} as Record<string, UnassignedTrip[]>);

    return (
        <div className="border-b border-gray-100 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-4 text-left cursor-pointer group hover:bg-gray-50/50 transition-colors rounded-lg -mx-1 px-1"
            >
                <span className="text-base text-gray-700 font-normal">
                    {dayName} <span className="text-gray-400 text-sm ml-1">{format(dayDate, 'd MMM', { locale: ru })}</span> ({trips.length})
                </span>
                <Icon
                    name="chevron-circle"
                    direction={isExpanded ? 'up' : 'right'}
                    className={`w-6 h-6 transition-colors ${isExpanded ? 'text-gray-600' : 'text-gray-300 group-hover:text-gray-400'}`}
                />
            </button>
            <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
            >
                <div className="overflow-hidden">
                    <div className="grid grid-cols-2 gap-3 pb-5 pt-1">
                        {Object.entries(tripsByRoute).map(([routeId, routeTrips]) => (
                            <div key={routeId} className="flex flex-col gap-2">
                                {routeTrips.map(trip => (
                                    <DraggableTripChip
                                        key={trip.id}
                                        trip={trip}
                                        isActive={activeTripId === trip.id}
                                        onClick={() => onTripClick(trip.id)}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DaySection;
