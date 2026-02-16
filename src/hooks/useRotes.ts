import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pb } from '../lib/pocketbase';

interface Route {
    id: string;
    name: string;
    from: string;
    to: string;
    price: number;
    bookingWindow: number;
    uiColor: string;
}

interface RouteResponse {
    id: string;
    name: string;
    from: string;
    to: string;
    price: number;
    booking_window: number;
    ui_color: string;
}


export const useRoutes = () => {
    return useQuery<Route[]>({
        queryKey: ['routes'],
        queryFn: async () => {
            // PocketBase сам применит правило organization = @request.auth.organization
            const records = await pb.collection('routes').getList<RouteResponse>(1, 50, {
                sort: "-order",
            });

            return records.items.map((route) => ({
                id: route.id,
                name: route.name,
                from: route.from,
                to: route.to,
                price: route.price,
                bookingWindow: route.booking_window,
                uiColor: route.ui_color,
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