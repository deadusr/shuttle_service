import { useMemo } from 'react';
import { useDrivers } from '../../hooks/useDrivers';
import { useTrips, useUnassignedTrips } from '../../hooks/useTrips';
import { TripBlocks } from './Trips';
import { format, startOfWeek, addDays, addMilliseconds } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import { Trip, UnassignedTrip } from '../../types';
import { TRIP_DURATION } from '../../utils/tripUtils';

interface DriverScheduleTableProps {
    startDate?: Date;
}

const DriverScheduleTable = ({ startDate = new Date() }: DriverScheduleTableProps) => {
    const { data: drivers } = useDrivers();
    const endDate = addDays(startDate, 6);
    const { data: trips } = useTrips(startDate.toISOString(), endDate.toISOString());
    const { data: unassignedTrips } = useUnassignedTrips(startDate.toISOString(), endDate.toISOString());

    // Calculate week days based on the selected date
    const start = startOfWeek(startDate, { weekStartsOn: 1 });
    const weekDays = useMemo(() => Array.from({ length: 7 }).map((_, i) => addDays(start, i)), [start]);

    const scheduleData = useMemo(() => {
        const data: Record<string, {
            totalTrips: number;
            days: Record<string, {
                trips: Trip[];
                workingHours: string;
                unassignedTrips: UnassignedTrip[];
            }>
        }> = {};

        // Initialize data structure for all drivers
        drivers?.forEach(driver => {
            data[driver.id] = {
                totalTrips: 0,
                days: {}
            };
            // Initialize days for each driver to ensure empty cells are handled consistently
            weekDays.forEach(day => {
                const dateKey = format(day, 'yyyy-MM-dd');
                data[driver.id].days[dateKey] = {
                    trips: [],
                    workingHours: '',
                    unassignedTrips: []
                };
            });
        });

        if (trips) {
            // Populate with trips
            trips.forEach(trip => {
                if (!trip.driver.id || !data[trip.driver.id]) return;

                const dateKey = format(trip.departure, 'yyyy-MM-dd');
                // Only add if date is within range (though useTrips should already filter, safety check)
                if (data[trip.driver.id]?.days[dateKey]) {
                    data[trip.driver.id].days[dateKey].trips.push(trip);
                    data[trip.driver.id].totalTrips++;
                }
            });
        }

        // Distribute unassigned trips by date
        if (drivers && unassignedTrips) {
            // Create a map of unassigned trips by date for faster access
            const unassignedByDate: Record<string, UnassignedTrip[]> = {};
            unassignedTrips.forEach(trip => {
                const dateKey = format(trip.departure, 'yyyy-MM-dd');
                if (!unassignedByDate[dateKey]) {
                    unassignedByDate[dateKey] = [];
                }
                unassignedByDate[dateKey].push(trip);
            });

            // Assign to each driver's day slot (same pool for all drivers on that day)
            drivers.forEach(driver => {
                weekDays.forEach(day => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    if (data[driver.id]?.days[dateKey] && unassignedByDate[dateKey]) {
                        data[driver.id].days[dateKey].unassignedTrips = unassignedByDate[dateKey];
                    }
                });
            });
        }

        // Calculate working hours and sort trips for each day
        Object.values(data).forEach(driverData => {
            Object.values(driverData.days).forEach(dayData => {
                if (dayData.trips.length > 0) {
                    dayData.trips.sort((a, b) => a.departure.getTime() - b.departure.getTime());
                    const firstTrip = dayData.trips[0];
                    const lastTrip = dayData.trips[dayData.trips.length - 1];
                    const startTime = format(firstTrip.departure, 'H:mm');
                    const endTime = format(addMilliseconds(lastTrip.departure, TRIP_DURATION), 'H:mm');
                    dayData.workingHours = `${startTime} ~ ${endTime}`;
                }
            });
        });

        return data;
    }, [drivers, trips, unassignedTrips, weekDays]);

    return (
        <div className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            <div className=" overflow-hidden flex flex-col h-full">
                <div className="overflow-auto flex-1">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 text-left text-sm font-normal text-gray-600 w-36 min-w-36 sticky left-0 bg-gray-50 z-20 border-r border-gray-200">
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
                            {drivers?.map((driver) => {
                                const driverData = scheduleData[driver.id];
                                return (
                                    <tr key={driver.id} className="">
                                        <td className="p-4 align-top text-sm font-medium text-gray-900 sticky left-0  z-10 border-r border-gray-200 bg-white">
                                            <div>{driver.name}</div>
                                            <div className="text-xs text-gray-500 font-normal mt-0.5">
                                                Всего: {driverData?.totalTrips || 0} рейсов
                                            </div>
                                        </td>

                                        {weekDays.map((day) => {
                                            const dateKey = format(day, 'yyyy-MM-dd');
                                            const dayData = driverData?.days[dateKey];

                                            return (
                                                <td
                                                    key={day.toISOString()}
                                                    className="border-r border-gray-200 last:border-r-0 w-[184px] min-w-[184px] h-24 align-top"
                                                >
                                                    <div className="flex flex-col gap-4 px-3 pt-2 pb-6">
                                                        {dayData?.workingHours && (
                                                            <span className="text-xs text-gray-600 text-center">{dayData.workingHours}</span>
                                                        )}
                                                        <TripBlocks date={dateKey}
                                                            trips={dayData?.trips || []}
                                                            driver={driver}
                                                            unassignedTrips={dayData?.unassignedTrips || []}
                                                        />
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DriverScheduleTable;
