import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pb } from '../lib/pocketbase';
import { Route } from '../types';

export interface RouteResponse {
    id: string;
    name: string;
    price: number;
    booking_window: number;
    from: {
        name: string;
        short_name: string;
        color: string;
    }
    to: {
        name: string;
        short_name: string;
        color: string;
    }
}


export const useRoutes = () => {
    return useQuery<Route[]>({
        queryKey: ['routes'],
        queryFn: async () => {
            // PocketBase сам применит правило organization = @request.auth.organization
            const records = await pb.collection('routes').getList<RouteResponse>(1, 50, {
                sort: "-order",
                expand: 'from,to',
            });

            return records.items.map((route) => ({
                id: route.id,
                name: route.name,
                from: {
                    name: route.from.name,
                    shortName: route.from.short_name,
                    color: route.from.color,
                },
                to: {
                    name: route.to.name,
                    shortName: route.to.short_name,
                    color: route.to.color,
                },
                price: route.price,
                bookingWindow: route.booking_window,
            }));
        },
    });
};

export const useCreateRoute = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newRoute: Partial<Route>) => {
            // Важно: нужно явно передать ID организации текущего юзера
            const userOrg = pb.authStore.record?.organization;

            return await pb.collection('routes').create({
                ...newRoute,
                organization: userOrg, // Привязываем рейс к компании
            });
        },
        onSuccess: () => {
            // Обновляем список без перезагрузки страницы
            queryClient.invalidateQueries({ queryKey: ['routes'] });
        },
    });
};