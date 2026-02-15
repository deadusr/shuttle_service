import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pb } from '../lib/pocketbase';


interface Trip {
    id: string;
    departure: string;
    status: 'en-route' | 'scheduled' | 'finished';
    statusLabel: string; // e.g. "В пути", "Выехал 23 минуты назад"
    driver: string;
    price: number;
}

export const useTrips = (date: string) => {
    return useQuery({
        queryKey: ['trips', date],
        queryFn: async () => {
            // PocketBase сам применит правило organization = @request.auth.organization
            const records = await pb.collection('trips').getList<Trip>(1, 50, {
                filter: `departure >= "${date} 00:00:00"`,
                sort: 'departure',
                expand: 'driver', // Чтобы сразу получить имя водителя, а не просто ID
            });
            return records.items;
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