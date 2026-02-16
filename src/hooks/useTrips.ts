import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pb } from '../lib/pocketbase';


// Trip is now imported from ../types
import { Trip } from '../types';

interface TripExpand {
    driver?: {
        name: string;
        phone: string;
    };
    car?: {
        name: string; // Часто поле называется title или model/name, уточните в вашей схеме
        plate: string;
    };
    route?: {
        id: string;
        from: string;
        to: string;
    };
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


export const useTrips = (date: string) => {
    return useQuery<Trip[]>({
        queryKey: ['trips', date],
        queryFn: async () => {
            // PocketBase сам применит правило organization = @request.auth.organization
            const records = await pb.collection('trips').getList<TripResponse>(1, 50, {
                filter: `departure_date >= "${date} 00:00:00"`,
                sort: 'departure_date',
                expand: 'driver,car,route',
            });

            return records.items.map((trip) => ({
                id: trip.id,
                driver: {
                    name: trip.expand?.driver?.name || 'Неизвестно',
                    phone: trip.expand?.driver?.phone || '',
                },
                car: {
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
                    from: trip.expand?.route?.from || '',
                    to: trip.expand?.route?.to || '',
                },
            }));
        },
    });
};

export const useUnassignTrip = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (tripId: string) => {
            await pb.collection('trips').update(tripId, { driver: null });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] });
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
            queryClient.invalidateQueries({ queryKey: ['trips'] });
        },
    });
};