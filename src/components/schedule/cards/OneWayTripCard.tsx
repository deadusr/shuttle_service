
import { Trip } from '../../../types';
import { TripRow } from './TripRow';

interface OneWayTripCardProps {
    trip: Trip;
    onRemove: (tripId: string, e: React.MouseEvent) => void;
}

export const OneWayTripCard = ({ trip, onRemove }: OneWayTripCardProps) => {
    return (
        <div className='bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer relative group'>
            <TripRow
                trip={trip}
                onRemove={onRemove}
            />
        </div>
    );
};
