import { Trip, UnassignedTrip, Driver } from '../types';

export const TRIP_DURATION = 3 * 60 * 60 * 1000; // 4 hours in milliseconds
export const HOURS_OF_REST = 1 * 60 * 60 * 1000; // 1 hour in milliseconds

export type TripGroup =
    | { type: 'roundTrip'; tripTo: Trip; tripBack: Trip }
    | { type: 'oneWayTrip'; trip: Trip };

/**
 * Groups sorted trips into round-trip pairs (roundTrip) and one-way trips.
 * A round-trip pair is two consecutive trips where the second trip's route
 * is the reverse of the first (from↔to cities swapped).
 */
export const groupTrips = (trips: Trip[]): TripGroup[] => {
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
