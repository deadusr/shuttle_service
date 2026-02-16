import { useQuery } from '@tanstack/react-query';
import { pb } from '../lib/pocketbase';


import { Driver } from '../types';

interface DriverResponse {
    id: string;
    name: string;
    phone: string;
    home_city: string;
}


export const useDrivers = () => {
    return useQuery<Driver[]>({
        queryKey: ['users'],
        queryFn: async () => {
            const records = await pb.collection('users').getList<DriverResponse>(1, 50, {
                filter: 'role = "driver"'
            });

            return records.items.map((driver) => ({
                id: driver.id,
                name: driver.name,
                phone: driver.phone,
                homeCityId: driver.home_city,
            }));
        },
    });
};
