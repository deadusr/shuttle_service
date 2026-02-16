import { useState } from 'react';
import { Trip, Driver } from '../../types';
import { useUnassignedTrips, useUpdateTrip } from '../../hooks/useTrips';
import { Icon } from '../icons';
import { getRecommendedTrips, groupTrips } from '../../utils/tripUtils';

import { RoundTripCard } from './cards/RoundTripCard';
import { OneWayTripCard } from './cards/OneWayTripCard';
import { RecommendedTrips } from './RecommendedTrips';

interface TripBlocksProps {
    trips: Trip[];
    date: string;
    driver: Driver;
}

export const TripBlocks = ({ trips, date, driver }: TripBlocksProps) => {
    const [showRecommendedTrips, setShowRecommendedTrips] = useState(false);

    const { data: unassignedTrips } = useUnassignedTrips(date, date);
    const recommended = unassignedTrips ? getRecommendedTrips(driver, trips, unassignedTrips) : [];

    const updateTrip = useUpdateTrip();
    const handleAssignTrip = (tripId: string) => {
        updateTrip.mutate({ id: tripId, data: { driver: driver.id } });
    };

    const handleRemoveDriver = (tripId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        updateTrip.mutate({ id: tripId, data: { driver: null } });
    };

    const groups = groupTrips(trips);
    const hasOnlyRoundTrips = groups.length > 0 && groups.every(g => g.type === 'roundTrip');

    if (trips.length === 0) {
        return <RecommendedTrips trips={recommended} onTripClick={handleAssignTrip} />;
    }

    return (
        <div className='flex flex-col gap-2'>
            {groups.map((group) =>
                group.type === 'roundTrip' ? (
                    <RoundTripCard
                        key={group.tripTo.id}
                        tripTo={group.tripTo}
                        tripBack={group.tripBack}
                        onRemove={handleRemoveDriver}
                    />
                ) : (
                    <OneWayTripCard
                        key={group.trip.id}
                        trip={group.trip}
                        onRemove={handleRemoveDriver}
                    />
                )
            )}

            {hasOnlyRoundTrips ? (
                <>
                    {showRecommendedTrips && (
                        <RecommendedTrips trips={recommended} maxItems={2} onTripClick={handleAssignTrip} />
                    )}
                    <button
                        onClick={() => setShowRecommendedTrips(!showRecommendedTrips)}
                        className='hover:bg-gray-200/50 hover:text-gray-400 transition-colors flex justify-center items-center bg-gray-200/25 rounded-2xl py-2 text-sm font-medium text-gray-300 cursor-pointer'
                    >
                        <Icon name="add-circle" className='w-6 h-6' />
                    </button>
                </>
            ) : (
                <RecommendedTrips trips={recommended} maxItems={3} onTripClick={handleAssignTrip} />
            )}
        </div>
    );
};
