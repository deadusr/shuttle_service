import { Trip } from '../../types';

interface DriverCardProps {
    trip: Trip;
}

const DriverCard = ({ trip }: DriverCardProps) => {
    const { driver, car } = trip;
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start gap-3 relative">
                <div className="flex-1 flex flex-col gap-0">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm shrink-0">
                            {driver.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 truncate">{driver.name}</h3>
                    </div>
                    <p className=" pl-12 text-gray-700 font-medium font-mono">{driver.phone}</p>
                </div>
                <div className="w-px h-full bg-gray-200 absolute right-1/2"></div>

                <div className="flex flex-col gap-2">
                    <p className="text-sm text-slate-900">
                        <span className="text-xs">{car.name}</span> {" "}
                        <span className="font-bold font-mono">{car.plate}</span>
                    </p>
                    <div className="flex items-center gap-3">
                        {/* Seats Visualizer */}
                        <div className="flex gap-px h-4">
                            {Array.from({ length: trip.maxSeats }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-full rounded-sm first:rounded-l last:rounded-r ${i < trip.bookedSeats ? 'bg-emerald-500' : 'bg-gray-200'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-medium text-slate-900">
                            {trip.bookedSeats}/{trip.maxSeats} мест
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DriverCard;
