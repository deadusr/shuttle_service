
import { UnassignedTrip } from '../../types';
import TripChip from '../common/TripChip';
import { useUIStore } from '../../store/uiStore';

interface RecommendedTripsProps {
    trips: UnassignedTrip[];
    maxItems?: number;
    onTripClick?: (tripId: string) => void;
}

export const RecommendedTrips = ({ trips, maxItems = 4, onTripClick }: RecommendedTripsProps) => {
    const maxHeight = (maxItems * 46) + 12;
    const { highlightedTripId } = useUIStore();

    return (
        <div
            className='flex flex-col gap-2 overflow-y-auto scrollbar-hidden'
            style={{ maxHeight: trips.length > maxItems ? maxHeight : undefined }}
        >
            {trips.map(trip => (
                <TripChip
                    key={trip.id}
                    trip={trip}
                    variant="compact"
                    isActive={trip.id === highlightedTripId}
                    onClick={() => onTripClick?.(trip.id)}
                />
            ))}
        </div>
    );
};
