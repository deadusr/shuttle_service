import { Icon } from '../icons';
import { Trip, UnassignedTrip, Driver } from '../../types';
import { useUnassignedTrips, useUpdateTrip } from '../../hooks/useTrips';
import { useState } from 'react';
import TripChip from '../common/TripChip';

interface TripBlocksProps {
    trips: Trip[];
    date: string;
    driver: Driver;
}

type TripGroup =
    | { type: 'roundTrip'; tripTo: Trip; tripBack: Trip }
    | { type: 'oneWayTrip'; trip: Trip };

/**
 * Groups sorted trips into round-trip pairs (roundTrip) and one-way trips.
 * A round-trip pair is two consecutive trips where the second trip's route
 * is the reverse of the first (from↔to cities swapped).
 */
const groupTrips = (trips: Trip[]): TripGroup[] => {
    const sorted = [...trips].sort((a, b) => a.departure.getTime() - b.departure.getTime());
    const groups: TripGroup[] = [];
    let i = 0;

    while (i < sorted.length) {
        const current = sorted[i];
        const next = sorted[i + 1];

        if (
            next &&
            current.route.to.id === next.route.from.id &&
            current.route.from.id === next.route.to.id
        ) {
            groups.push({ type: 'roundTrip', tripTo: current, tripBack: next });
            i += 2;
        } else {
            groups.push({ type: 'oneWayTrip', trip: current });
            i += 1;
        }
    }

    return groups;
};

export const TripBlocks = ({ trips, date, driver }: TripBlocksProps) => {
    const [showRecommendedTrips, setShowRecommendedTrips] = useState(false);

    const { data: unassignedTrips } = useUnassignedTrips(date, date);
    const recommendedTrips = unassignedTrips ? getRecommendedTrips(driver, trips, unassignedTrips) : [];

    const updateTrip = useUpdateTrip();
    const handleAssignTrip = (tripId: string) => {
        updateTrip.mutate({ id: tripId, data: { driver: driver.id } });
    };

    const groups = groupTrips(trips);
    const hasOnlyRoundTrips = groups.length > 0 && groups.every(g => g.type === 'roundTrip');

    if (trips.length === 0) {
        return <RecomendedTrips trips={recommendedTrips} onTripClick={handleAssignTrip} />;
    }

    return (
        <div className='flex flex-col gap-2'>
            {groups.map((group) =>
                group.type === 'roundTrip' ? (
                    <RoundTripCard key={group.tripTo.id} tripTo={group.tripTo} tripBack={group.tripBack} />
                ) : (
                    <OneWayTripCard key={group.trip.id} trip={group.trip} />
                )
            )}

            {hasOnlyRoundTrips ? (
                <>
                    {showRecommendedTrips && <RecomendedTrips trips={recommendedTrips} maxItems={2} onTripClick={handleAssignTrip} />}
                    <button onClick={() => setShowRecommendedTrips(!showRecommendedTrips)} className='hover:bg-gray-200/50 hover:text-gray-400 transition-colors flex justify-center items-center bg-gray-200/25 rounded-2xl py-2 text-sm font-medium text-gray-300 cursor-pointer'>
                        <Icon name="add-circle" className='w-6 h-6' />
                    </button>
                </>
            ) : (
                <RecomendedTrips trips={recommendedTrips} maxItems={3} onTripClick={handleAssignTrip} />
            )}
        </div>
    );
};

const RoundTripCard = ({ tripTo, tripBack }: { tripTo: Trip; tripBack: Trip }) => {
    return (
        <div className='bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer'>
            <div className='flex flex-col gap-1 px-3 pt-3 pb-2 border-b border-dashed border-gray-400'>
                <div className='flex gap-1 items-center'>
                    <span className='text-base font-medium text-gray-900'>{tripTo.departure.toTimeString().split(' ')[0].slice(0, 5)}</span>
                    <div style={{ backgroundColor: tripTo.route.to.color + '16', color: tripTo.route.to.color }} className='p-0.5'>
                        <span className='text-base font-medium'>➔ {tripTo.route.to.shortName}</span>
                    </div>
                </div>
                <span className='text-xs text-gray-600'>{tripTo.car.name} {tripTo.car.plate}</span>
                <span className='text-base font-medium text-green-600 ml-auto'>{tripTo.bookedSeats}/{tripTo.maxSeats}</span>
            </div>

            <div className='flex flex-col gap-1 px-3 pt-3 pb-2'>
                <div className='flex gap-1 items-center'>
                    <span className='text-base font-medium text-gray-900'>{tripBack.departure.toTimeString().split(' ')[0].slice(0, 5)}</span>
                    <div style={{ backgroundColor: tripBack.route.to.color + '16', color: tripBack.route.to.color }} className='p-0.5'>
                        <span className='text-base font-medium'> ➔ {tripBack.route.to.shortName}</span>
                    </div>
                </div>
                <span className='text-xs text-gray-600'>{tripBack.car.name} {tripBack.car.plate}</span>
                <span className='text-base font-medium text-green-600 ml-auto'>{tripBack.bookedSeats}/{tripBack.maxSeats}</span>
            </div>
        </div>
    );
};

const OneWayTripCard = ({ trip }: { trip: Trip }) => {
    return (
        <div className='bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer'>
            <div className='flex flex-col gap-1 px-3 pt-3 pb-2'>
                <div className='flex gap-1 items-center'>
                    <span className='text-base font-medium text-gray-900'>{trip.departure.toTimeString().split(' ')[0].slice(0, 5)}</span>
                    <div style={{ backgroundColor: trip.route.to.color + '16', color: trip.route.to.color }} className='p-0.5'>
                        <span className='text-base font-medium'> ➔ {trip.route.to.shortName}</span>
                    </div>
                </div>
                <span className='text-xs text-gray-600'>{trip.car.name} {trip.car.plate}</span>
                <span className='text-base font-medium text-green-600 ml-auto'>{trip.bookedSeats}/{trip.maxSeats}</span>
            </div>
        </div>
    );
};

export const RecomendedTrips = ({ trips, maxItems = 4, onTripClick }: { trips: UnassignedTrip[], maxItems?: number, onTripClick?: (tripId: string) => void }) => {
    const maxHeight = (maxItems * 46) + 12;

    return (
        <div
            className='flex flex-col gap-2 overflow-y-auto scrollbar-hidden'
            style={{ maxHeight: trips.length > maxItems ? maxHeight : undefined }}
        >
            {trips.map(trip => (
                <TripChip key={trip.id} trip={trip} variant="compact" onClick={() => onTripClick?.(trip.id)} />
            ))}
        </div>
    )
}


export const TRIP_DURATION = 3 * 60 * 60 * 1000; // 4 hours in milliseconds
export const HOURS_OF_REST = 1 * 60 * 60 * 1000; // 1 hour in milliseconds

export const getRecommendedTrips = (driver: Driver, driverTrips: Trip[], unassignedTrips: UnassignedTrip[]): UnassignedTrip[] => {
    // Sort driver's trips by departure time to find the last one
    const sortedDriverTrips = [...driverTrips].sort((a, b) => a.departure.getTime() - b.departure.getTime());
    const lastTrip = sortedDriverTrips[sortedDriverTrips.length - 1];

    let currentCityId = driver.homeCityId;
    let availableTime = new Date(0); // Start availablity from beginning if no trips

    if (lastTrip) {
        currentCityId = lastTrip.route.to.id;
        // Available after arrival (departure + duration) + rest
        availableTime = new Date(lastTrip.departure.getTime() + TRIP_DURATION + HOURS_OF_REST);
    }

    return unassignedTrips.filter(trip => {
        const fromCityId = trip.route.from.id;
        const isCorrectCity = fromCityId === currentCityId;
        const isAfterAvailableTime = trip.departure.getTime() >= availableTime.getTime();

        return isCorrectCity && isAfterAvailableTime;
    });
};
