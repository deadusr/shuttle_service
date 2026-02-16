import { useQuery } from '@tanstack/react-query';
import { pb } from '../lib/pocketbase';


import { Booking } from '../types';

interface BookingExpand {
    client: {
        name: string;
        phone: string;
    };
}

interface BookingResponse {
    id: string;
    client: string;
    price: number;
    seats_booked: number;
    comments: string;
    expand?: BookingExpand;
}


export const useBookings = (tripId: string) => {
    return useQuery<Booking[]>({
        queryKey: ['bookings', tripId],
        enabled: !!tripId,
        queryFn: async () => {
            const records = await pb.collection('bookings').getList<BookingResponse>(1, 50, {
                filter: `trip = '${tripId}'`,
                expand: 'client',
            });

            return records.items.map((booking) => ({
                id: booking.id,
                client: {
                    name: booking.expand?.client?.name || 'Неизвестно',
                    phone: booking.expand?.client?.phone || '',
                },
                seatsBooked: booking.seats_booked,
                price: booking.price,
                comments: booking.comments,
            }));
        },
    });
};