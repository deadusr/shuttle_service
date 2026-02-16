import { Icon } from '../icons';
import { Trip, UnassignedTrip } from '../../types';
import { useUnassignedTrips } from '../../hooks/useTrips';
import { useState } from 'react';

interface TripBlocksProps {
    trips: Trip[];
    date: string;
}

export const TripBlocks = ({ trips, date }: TripBlocksProps) => {


    return (
        <div className='flex flex-col gap-2'>
            {trips.length > 1
                ? <FullTrip tripTo={trips[0]} tripBack={trips[1]} date={date} /> : trips.length === 1
                    ? <OneWayTrip trip={trips[0]} date={date} />
                    : <EmptyTrip date={date} />
            }
        </div>
    )
}

const FullTrip = ({ tripTo, tripBack, date }: { tripTo: Trip, tripBack: Trip, date: string }) => {
    const [showRecomenedTrips, setShowRecomenedTrips] = useState(false);

    const { data: unassignedTrips } = useUnassignedTrips(date, date);
    return (
        <>
            <div className='bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow  cursor-pointer'>
                <div className='flex flex-col gap-1 px-3 pt-3 pb-2 border-b border-dashed border-gray-400'>
                    <div className='flex gap-1 items-center'>
                        <span className='text-base font-medium text-gray-900'>{tripTo.departure.toTimeString().split(' ')[0].slice(0, 5)}</span>
                        <div className='p-0.5 bg-direction-forward-light text-direction-forward'>
                            <span className='text-base font-medium'>➔ {tripTo.route.to.shortName}</span>
                        </div>
                    </div>
                    <span className='text-xs text-gray-600'>{tripTo.car.name} {tripTo.car.plate}</span>
                    <span className='text-base font-medium text-green-600 ml-auto'>{tripTo.bookedSeats}/{tripTo.maxSeats}</span>
                </div>

                <div className='flex flex-col gap-1 px-3 pt-3 pb-2'>
                    <div className='flex gap-1 items-center'>
                        <span className='text-base font-medium text-gray-900'>{tripBack.departure.toTimeString().split(' ')[0].slice(0, 5)}</span>
                        <div className='p-0.5 bg-direction-forward-light text-direction-forward'>
                            <span className='text-base font-medium'> ➔ {tripBack.route.to.shortName}</span>
                        </div>
                    </div>
                    <span className='text-xs text-gray-600'>{tripBack.car.name} {tripBack.car.plate}</span>
                    <span className='text-base font-medium text-green-600 ml-auto'>{tripBack.bookedSeats}/{tripBack.maxSeats}</span>
                </div>

            </div>

            {showRecomenedTrips && <RecomendedTrips trips={unassignedTrips || []} maxItems={2} />}

            <button onClick={() => setShowRecomenedTrips(!showRecomenedTrips)} className='hover:bg-gray-200/50 hover:text-gray-400 transition-colors flex justify-center items-center bg-gray-200/25 rounded-2xl py-2 text-sm font-medium text-gray-300 cursor-pointer'>
                <Icon name="add-circle" className='w-6 h-6' />
            </button>
        </>
    )
}

export const OneWayTrip = ({ trip, date }: { trip: Trip, date: string }) => {
    const { data: unassignedTrips } = useUnassignedTrips(date, date);


    return (
        <>
            <div className='bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow  cursor-pointer'>
                <div className='flex flex-col gap-1 px-3 pt-3 pb-2'>
                    <div className='flex gap-1 items-center'>
                        <span className='text-base font-medium text-gray-900'>{trip.departure.toTimeString().split(' ')[0].slice(0, 5)}</span>
                        <div className='p-0.5 bg-direction-forward-light text-direction-forward'>
                            <span className='text-base font-medium'> ➔ {trip.route.to.shortName}</span>
                        </div>
                    </div>
                    <span className='text-xs text-gray-600'>{trip.car.name} {trip.car.plate}</span>
                    <span className='text-base font-medium text-green-600 ml-auto'>{trip.bookedSeats}/{trip.maxSeats}</span>
                </div>
            </div>

            <RecomendedTrips trips={unassignedTrips || []} maxItems={3} />
        </>
    )
}

const EmptyTrip = ({ date }: { date: string }) => {
    const { data: unassignedTrips } = useUnassignedTrips(date, date);

    return (
        <RecomendedTrips trips={unassignedTrips || []} />
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
