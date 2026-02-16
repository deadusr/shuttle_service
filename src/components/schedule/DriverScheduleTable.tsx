import { useMemo } from 'react';
import { useDrivers } from '../../hooks/useDrivers';
import { useTrips } from '../../hooks/useTrips';
import { TripBlocks } from './Trips';
import { format, startOfWeek, addDays } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import { Trip } from '../../types';

interface DriverScheduleTableProps {
    startDate?: Date;
}

const DriverScheduleTable = ({ startDate = new Date() }: DriverScheduleTableProps) => {
    const { data: drivers } = useDrivers();
    const { data: trips } = useTrips(startDate.toISOString(), addDays(startDate, 6).toISOString());

    const assignTrips = useMemo(() => {
        return trips?.filter((trip) => trip.driver.id) || [];
    }, [trips]);

    const tripsByDriver = useMemo(() => {
        return drivers?.reduce((acc, driver) => {
            const driverTrips = assignTrips?.filter((trip) => trip.driver.id === driver.id) || [];
            acc[driver.id] = driverTrips;
            return acc;
        }, {} as Record<string, Trip[]>) || {};
    }, [drivers, trips]);

    // Calculate week days based on the selected date
    const start = startOfWeek(startDate, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(start, i));

    return (
        <div className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            <div className=" overflow-hidden flex flex-col h-full">
                <div className="overflow-auto flex-1">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 text-left text-sm font-normal text-gray-600 w-64 min-w-64 sticky left-0 bg-gray-50 z-20 border-r border-gray-200">
                                    Водитель
                                </th>
                                {weekDays.map((day) => (
                                    <th
                                        key={day.toISOString()}
                                        className="p-4 text-center text-sm font-normal text-gray-600 w-[184px] min-w-[184px] border-r border-gray-200 last:border-r-0"
                                    >
                                        <div className="capitalize">{format(day, 'EEEE', { locale: ru })}</div>
                                        <div className="text-xs text-gray-400 mt-1">{format(day, 'd MMM', { locale: ru })}</div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {drivers?.map((driver) => (
                                <tr key={driver.id} className="">
                                    <td className="p-4 text-sm font-medium text-gray-900 sticky left-0  z-10 border-r border-gray-200 bg-white">
                                        {driver.name}
                                    </td>

                                    {weekDays.map((day) => {
                                        const dateKey = format(day, 'yyyy-MM-dd');
                                        return (
                                            <td
                                                key={day.toISOString()}
                                                className="border-r border-gray-200 last:border-r-0 w-[184px] min-w-[184px] h-24 align-top"
                                            >
                                                <div className="flex flex-col gap-4 px-3 pt-2 pb-6">
                                                    <span className="text-xs text-gray-600 text-center">6:00 ~ 14:00</span>
                                                    <TripBlocks date={dateKey}
                                                        trips={tripsByDriver[driver.id].filter((trip) => format(trip.departure, 'yyyy-MM-dd') === dateKey)}
                                                        driver={driver}
                                                    />
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DriverScheduleTable;
