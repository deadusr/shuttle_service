import { Trip } from '../types';
import Icon from './icons/Icon';

interface TripCardProps {
    trip: Trip;
    variant: 'blue' | 'purple';
    size?: "short" | "long"
}

const TripCard = ({ trip, size = 'short' }: TripCardProps) => {
    const isReserve = trip.driver.seatsOccupied === 0;
    const statusStyles = {
        'en-route': 'bg-green-100 text-green-700',
        'scheduled': 'bg-blue-100 text-blue-700',
        'finished': 'bg-gray-100 text-gray-500'
    }[trip.status] || 'bg-gray-100 text-gray-500';

    const percentage = trip.driver.seatsTotal > 0
        ? Math.round((trip.driver.seatsOccupied / trip.driver.seatsTotal) * 100)
        : 0;


    const stateStyles = {
        'short': 'max-2xl:flex-col max-2xl:gap-3 max-2xl:items-start flex-row gap-4 items-center',
        'long': 'flex-row gap-4 items-center '
    }[size];

    return (
        <div className={`bg-white rounded-2xl ${stateStyles}  gap-2 p-4 shadow-sm border border-gray-100 mb-3 flex justify-between hover:shadow-md transition-shadow cursor-pointer`}>
            <div className="flex items-center gap-4">
                <div className={`${statusStyles} px-3 py-1.5 rounded-xl font-medium text-lg`}>
                    {trip.time}
                </div>

                <div>
                    <h3 className="font-medium text-lg text-gray-900">{trip.driver.name}</h3>
                    <p className="text-gray-500 text-sm">{trip.driver.car} {trip.driver.plate}</p>
                </div>

                {/* <div className={`w-0 opacity-0 transition-all duration-300 ease-in-out ${size === "long" ? "2xl:w-auto 2xl:opacity-100" : ""} flex items-center gap-2`}>
                    {trip.status === 'en-route' && (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full flex-shrink-0 bg-emerald-500 animate-pulse" />

                            <span className="text-green-700">В пути</span>
                        </div>
                    )}
                    {trip.status === 'finished' && (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gray-500" />
                            <span className="text-gray-500">Завершен</span>
                        </div>
                    )}
                </div> */}
            </div>

            {/* Status / Seats */}
            {isReserve ? (
                <div className={`ml-auto text-orange-600  bg-orange-50 px-4 py-1.5 rounded-xl font-medium flex items-center gap-2`}>
                    Резерв
                    <Icon name="add-circle" className="w-5 h-5 text-orange-500" />
                </div>
            ) : (
                <div
                    className={`ml-auto text-green-800 px-4 py-1.5 rounded-xl font-medium flex items-center gap-2 relative overflow-hidden`}
                    style={{
                        background: `linear-gradient(to right, #dcfce7 ${percentage}%, #f3f4f6 ${percentage}%)`
                    }}
                >
                    <span className="relative z-10 whitespace-nowrap">{trip.driver.seatsOccupied} / {trip.driver.seatsTotal}</span>
                    <Icon name="add-circle" className="w-5 h-5 text-green-700 relative z-10" />
                </div>
            )}
        </div>
    );
};

export default TripCard;
