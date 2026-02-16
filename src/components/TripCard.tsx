import { Trip } from '../types';
import Icon from './icons/Icon';

interface TripCardProps {
    trip: Trip;
    size?: "short" | "long";
    onClick?: () => void;
}

const TripCard = ({ trip, size = 'short', onClick }: TripCardProps) => {
    const isReserve = trip.bookedSeats === trip.maxSeats;
    const statusStyles: Record<string, string> = {
        'en-route': 'bg-green-100 text-green-700',
        'scheduled': 'bg-blue-100 text-blue-700',
        'finished': 'bg-gray-100 text-gray-500'
    };
    const currentStatusStyle = statusStyles[trip.status] || 'bg-gray-100 text-gray-500';

    const percentage = trip.bookedSeats > 0
        ? Math.round((trip.bookedSeats / trip.maxSeats) * 100)
        : 0;


    const stateStyles = {
        'short': 'max-2xl:flex-col max-2xl:gap-3 max-2xl:items-start flex-row gap-4 items-center',
        'long': 'flex-row gap-4 items-center '
    }[size];

    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-2xl ${stateStyles}  gap-2 p-4 shadow-sm border border-gray-100 mb-3 flex justify-between hover:shadow-md transition-shadow cursor-pointer`}
        >
            <div className="flex items-center gap-4">
                <div className={`${currentStatusStyle} px-3 py-1.5 rounded-xl font-medium text-lg`}>
                    {trip.departure.toLocaleString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>

                <div>
                    <h3 className="font-medium text-lg text-gray-900">{trip.driver.name}</h3>
                    <p className="text-gray-500 text-sm">{trip.car.name} {trip.car.plate}</p>
                </div>
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
                    <span className="relative z-10 whitespace-nowrap">{trip.bookedSeats} / {trip.maxSeats}</span>
                    <Icon name="add-circle" className="w-5 h-5 text-green-700 relative z-10" />
                </div>
            )}
        </div>
    );
};

export default TripCard;
