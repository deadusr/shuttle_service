import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pb } from '../lib/pocketbase';
import { Route } from '../types';

export interface RouteResponse {
    id: string;
    name: string;
    price: number;
    booking_window: number;
    expand: RouteExpand;
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
                    id: route.expand.from.id,
                    name: route.expand.from.name,
                    shortName: route.expand.from.short_name,
                    color: route.expand.from.ui_color,
                },
                to: {
                    id: route.expand.to.id,
                    name: route.expand.to.name,
                    shortName: route.expand.to.short_name,
                    color: route.expand.to.ui_color,
                },
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