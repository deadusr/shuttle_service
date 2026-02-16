import { Trip } from '../../types';

interface TripHeaderProps {
    trip: Trip;
}

const TripHeader = ({ trip }: TripHeaderProps) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-baseline gap-2 mb-2">
                <span className="text-xl font-bold text-gray-900">
                    {trip.departure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <div style={{ color: trip.route.to.color }} className="flex items-center gap-1.5 text-xl font-medium">
                    <span>{trip.route.from.name}</span>
                    <span>→</span>
                    <span>{trip.route.to.name}</span>
                </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5 px-4 py-2 rounded bg-emerald-50 text-emerald-600 font-medium">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    В пути
                </div>
                <span className="text-gray-500">{trip.statusLabel}</span>
            </div>
        </div>
    );
};

export default TripHeader;
