
import { Icon } from '../../icons';
import { Trip } from '../../../types';

interface TripRowProps {
    trip: Trip;
    onRemove: (tripId: string, e: React.MouseEvent) => void;
    bottomRoundTrip?: boolean;
    topRoundTrip?: boolean;
}

export const TripRow = ({ trip, onRemove, bottomRoundTrip, topRoundTrip }: TripRowProps) => {
    return (
        <div className={`flex flex-col gap-1 px-3 pt-3 pb-2 relative group ${topRoundTrip ? "border-b border-dashed border-gray-400" : ""}`}>
            <button
                onClick={(e) => onRemove(trip.id, e)}
                className={`absolute h-5 w-5 flex items-center justify-center p-0.5 rounded-full bg-gray-200 hover:bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${bottomRoundTrip ? "-top-2 -right-1.5" : '-top-1 -right-1'}`}
            >
                <Icon name="dismiss" className='w-2 h-2 text-gray-500 hover:text-gray-900' />
            </button>
            <div className='flex gap-1 items-center'>
                <span className='text-base font-medium text-gray-900'>
                    {trip.departure.toTimeString().split(' ')[0].slice(0, 5)}
                </span>
                <div
                    style={{ backgroundColor: trip.route.to.color + '16', color: trip.route.to.color }}
                    className='p-0.5'
                >
                    <span className='text-base font-medium'> ➔ {trip.route.to.shortName}</span>
                </div>
            </div>
            <span className='text-xs text-gray-600'>{trip.car.name} {trip.car.plate}</span>
            <span className='text-base font-medium text-green-600 ml-auto'>{trip.bookedSeats}/{trip.maxSeats}</span>
        </div>
    );
};
