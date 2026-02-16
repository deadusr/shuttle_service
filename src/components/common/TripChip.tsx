import { format } from 'date-fns';
import type { UnassignedTrip } from '../../types';

interface TripChipProps {
    trip: UnassignedTrip;
    isActive?: boolean;
    variant?: 'default' | 'compact';
    onClick?: () => void;
}

const TripChip = ({ trip, isActive = false, variant = 'default', onClick }: TripChipProps) => {
    const destination = trip.route.to.shortName || trip.route.to.name;

    if (variant === 'compact') {
        const borderColor = isActive ? trip.route.to.color : 'var(--color-gray-300)';
        const backgroundColor = isActive ? trip.route.to.color + '16' : 'transparent';
        const textColor = isActive ? trip.route.to.color : 'inherit';

        return (
            <div
                onClick={onClick}
                style={{
                    borderStyle: 'dashed',
                    borderColor,
                    backgroundColor
                }}
                className={`w-full shrink-0 rounded-full border py-2 text-sm text-center cursor-pointer transition-colors ${!isActive ? 'text-gray-300 hover:border-gray-400 hover:text-gray-400' : ''}`}
            >
                <span style={{ color: isActive ? textColor : 'inherit' }}>
                    {format(trip.departure, 'HH:mm')} ➔ {destination}
                </span>
            </div>
        );
    }

    return (
        <div
            onClick={onClick}
            style={{
                border: `${isActive ? 'solid' : 'dashed'} 1px ${isActive ? trip.route.to.color : 'var(--color-gray-300)'}`
            }}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 select-none border bg-white hover:shadow-sm"
        >
            <span className="text-gray-900">{format(trip.departure, 'HH:mm')}</span>
            <div
                style={{ backgroundColor: trip.route.to.color + '16', color: trip.route.to.color }}
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded"
            >
                <span className="text-sm font-medium">➔ {destination}</span>
            </div>
        </div>
    );
};

export default TripChip;
