import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pb } from '../lib/pocketbase';


// Trip is now imported from ../types
import { Trip, UnassignedTrip } from '../types';

interface TripExpand {
    driver?: {
        id: string;
        name: string;
        phone: string;
        home_city: string;
    };
    car?: {
        id: string;
        name: string; // Часто поле называется title или model/name, уточните в вашей схеме
        plate: string;
    };
    route?: {
        id: string;
        name: string;
        expand?: RouteExpand
    }
}

interface RouteExpand {
    from: {
        id: string;
        name: string;
        short_name: string;
        ui_color: string;
    };
    to: {
        id: string;
        name: string;
        short_name: string;
        ui_color: string;
    }
}

interface TripResponse {
    id: string;
    driver: string; // ID водителя
    car: string;    // ID машины
    departure_date: string;
    status: 'en-route' | 'scheduled' | 'finished';
    price: number;
    status_label: string;
    expand?: TripExpand;
    booked_seats: number;
    max_seats: number;
}


export const useTrips = (startDate: string, endDate?: string) => {
    return useQuery<Trip[]>({
        queryKey: ['trips', startDate, endDate],
        queryFn: async () => {
            // PocketBase сам применит правило organization = @request.auth.organization
            const records = await pb.collection('trips').getList<TripResponse>(1, 50, {
                filter: `departure_date >= "${startDate} 00:00:00"${endDate ? ` && departure_date <= "${endDate} 23:59:59"` : ''}`,
                sort: 'departure_date',
                expand: 'driver,car,route,route.from,route.to',
            });

            return records.items.map((trip) => ({
                id: trip.id,
                driver: {
                    id: trip.expand?.driver?.id || '',
                    name: trip.expand?.driver?.name || 'Неизвестно',
                    phone: trip.expand?.driver?.phone || '',
                    homeCityId: trip.expand?.driver?.home_city || '',
                },
                car: {
                    id: trip.expand?.car?.id || '',
                    name: trip.expand?.car?.name || 'Неизвестно', // title часто дефолтное поле в PB
                    plate: trip.expand?.car?.plate || '',
                },
                maxSeats: trip.max_seats,
                bookedSeats: trip.booked_seats,
                price: trip.price,
                status: trip.status,
                departure: new Date(trip.departure_date),
                statusLabel: trip.status_label,
                routeId: trip.expand?.route?.id || '',
                route: {
                    id: trip.expand?.route?.id || '',
                    name: trip.expand?.route?.name || '',
                    from: {
                        id: trip.expand?.route?.expand?.from.id || '',
                        name: trip.expand?.route?.expand?.from.name || '',
                        shortName: trip.expand?.route?.expand?.from.short_name || '',
                        color: trip.expand?.route?.expand?.from.ui_color || '',
                    },
                    to: {
                        id: trip.expand?.route?.expand?.to.id || '',
                        name: trip.expand?.route?.expand?.to.name || '',
                        shortName: trip.expand?.route?.expand?.to.short_name || '',
                        color: trip.expand?.route?.expand?.to.ui_color || '',
                    }
                }
            }));
        },
    });
};



export const useUnassignedTrips = (startDate: string, endDate?: string) => {
    return useQuery<UnassignedTrip[]>({
        queryKey: ['unassigned-trips', startDate, endDate],
        queryFn: async () => {
            const records = await pb.collection('trips').getList<TripResponse>(1, 50, {
                filter: `driver = "" && departure_date >= "${startDate} 00:00:00"${endDate ? ` && departure_date <= "${endDate} 23:59:59"` : ''}`,
                sort: 'departure_date',
                expand: 'route,route.from,route.to',
            });

            return records.items.map((trip) => ({
                id: trip.id,
                maxSeats: trip.max_seats,
                bookedSeats: trip.booked_seats,
                price: trip.price,
                status: trip.status,
                departure: new Date(trip.departure_date),
                statusLabel: trip.status_label,
                routeId: trip.expand?.route?.id || '',
                route: {
                    id: trip.expand?.route?.id || '',
                    name: trip.expand?.route?.name || '',
                    from: {
                        id: trip.expand?.route?.expand?.from.id || '',
                        name: trip.expand?.route?.expand?.from.name || '',
                        shortName: trip.expand?.route?.expand?.from.short_name || '',
                        color: trip.expand?.route?.expand?.from.ui_color || '',
                    },
                    to: {
                        id: trip.expand?.route?.expand?.to.id || '',
                        name: trip.expand?.route?.expand?.to.name || '',
                        shortName: trip.expand?.route?.expand?.to.short_name || '',
                        color: trip.expand?.route?.expand?.to.ui_color || '',
                    }
                }
            }));
        },
    });
};

export const useCreateTrip = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newTrip: Partial<Trip>) => {
            // Важно: нужно явно передать ID организации текущего юзера
            const userOrg = pb.authStore.record?.organization;

            return await pb.collection('trips').create({
                ...newTrip,
                organization: userOrg, // Привязываем рейс к компании
            });
        },
        onSuccess: () => {
            // Обновляем список без перезагрузки страницы
            queryClient.invalidateQueries({ queryKey: ['trips', 'unassigned-trips'] });
        },
    });
};