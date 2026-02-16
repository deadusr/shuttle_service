
import { Trip } from '../../../types';
import { TripRow } from './TripRow';

interface RoundTripCardProps {
    tripTo: Trip;
    tripBack: Trip;
    onRemove: (tripId: string, e: React.MouseEvent) => void;
}

export const RoundTripCard = ({ tripTo, tripBack, onRemove }: RoundTripCardProps) => {
    return (
        <div className='bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer'>
            <TripRow
                trip={tripTo}
                onRemove={onRemove}
                topRoundTrip
            />
            <TripRow
                trip={tripBack}
                onRemove={onRemove}
                bottomRoundTrip
            />
        </div>
    );
};
