import { Icon } from '../icons';
import { Trip, UnassignedTrip, Driver } from '../../types';
import { useUnassignedTrips } from '../../hooks/useTrips';
import { useState } from 'react';

interface TripBlocksProps {
    trips: Trip[];
    date: string;
    driver: Driver;
}

export const TripBlocks = ({ trips, date, driver }: TripBlocksProps) => {

    return (
        <div className='flex flex-col gap-2'>
            {trips.length > 1
                ? <FullTrip tripTo={trips[0]} tripBack={trips[1]} date={date} driver={driver} /> : trips.length === 1
                    ? <OneWayTrip trip={trips[0]} date={date} driver={driver} />
                    : <EmptyTrip date={date} driver={driver} />
            }
        </div>
    )
}

const FullTrip = ({ tripTo, tripBack, date, driver }: { tripTo: Trip, tripBack: Trip, date: string, driver: Driver }) => {
    const [showRecomenedTrips, setShowRecomenedTrips] = useState(false);

    const { data: unassignedTrips } = useUnassignedTrips(date, date);
    const recommendedTrips = unassignedTrips ? getRecommendedTrips(driver, [tripTo, tripBack], unassignedTrips) : [];
    return (
        <>
            <div className='bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow  cursor-pointer'>
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

            {showRecomenedTrips && <RecomendedTrips trips={recommendedTrips} maxItems={2} />}

            <button onClick={() => setShowRecomenedTrips(!showRecomenedTrips)} className='hover:bg-gray-200/50 hover:text-gray-400 transition-colors flex justify-center items-center bg-gray-200/25 rounded-2xl py-2 text-sm font-medium text-gray-300 cursor-pointer'>
                <Icon name="add-circle" className='w-6 h-6' />
            </button>
        </>
    )
}

export const OneWayTrip = ({ trip, date, driver }: { trip: Trip, date: string, driver: Driver }) => {
    const { data: unassignedTrips } = useUnassignedTrips(date, date);
    const recommendedTrips = unassignedTrips ? getRecommendedTrips(driver, [trip], unassignedTrips) : [];


    return (
        <>
            <div className='bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow  cursor-pointer'>
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

            <RecomendedTrips trips={recommendedTrips} maxItems={3} />
        </>
    )
}

const EmptyTrip = ({ date, driver }: { date: string, driver: Driver }) => {
    const { data: unassignedTrips } = useUnassignedTrips(date, date);
    const recommendedTrips = unassignedTrips ? getRecommendedTrips(driver, [], unassignedTrips) : [];

    return (
        <RecomendedTrips trips={recommendedTrips} />
    )
}

export const RecomendedTrips = ({ trips, maxItems = 4 }: { trips: UnassignedTrip[], maxItems?: number }) => {
    const maxHeight = (maxItems * 46) + 12;

    return (
        <div
            className='flex flex-col gap-2 overflow-y-auto scrollbar-hidden'
            style={{ maxHeight: trips.length > maxItems ? maxHeight : undefined }}
        >
            {trips.map(trip => (
                <div className='w-full shrink-0 rounded-full border border-gray-300 border-dashed py-2 text-sm text-center text-gray-300 cursor-pointer hover:border-gray-400 hover:text-gray-400 transition-colors'>
                    <span className=''>{trip.departure.toTimeString().split(' ')[0].slice(0, 5)} ➔ {trip.route.to.shortName}</span>
                </div>
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
