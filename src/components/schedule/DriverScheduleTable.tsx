import { mockDrivers } from '../../data/mockData';
import { useDrivers } from '../../hooks/useDrivers';
import { FullTrip, ShortTrip, EmptyTrip } from './TripBlocks';

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const DriverScheduleTable = () => {
    const { data: drivers } = useDrivers();
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
                                {days.map((day) => (
                                    <th
                                        key={day}
                                        className="p-4 text-center text-sm font-normal text-gray-600 w-[184px] min-w-[184px] border-r border-gray-200 last:border-r-0"
                                    >
                                        {day}
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
                                    {days.map((day) => (
                                        <td
                                            key={day}
                                            className="border-r border-gray-200 last:border-r-0 w-[184px] min-w-[184px] h-24 align-top"
                                        >
                                            <div className="flex flex-col gap-4 px-3 pt-2 pb-6">
                                                <span className="text-xs text-gray-600 text-center">6:00 ~ 14:00</span>
                                                {/* {driver.trips.length === 2 ? <FullTrip /> : driver.trips.length === 1 ? <ShortTrip /> : <EmptyTrip />} */}
                                                <EmptyTrip />
                                            </div>
                                        </td>
                                    ))}
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
