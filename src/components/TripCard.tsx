import { Trip } from '../types';
import Icon from './icons/Icon';

interface TripCardProps {
    trip: Trip;
    variant: 'blue' | 'purple';
}

const TripCard = ({ trip, variant }: TripCardProps) => {
    // Style configurations based on variant
    const styles = {
        blue: {
            timeBg: 'bg-gray-100',
            timeText: 'text-gray-500',
            seatsText: 'text-green-800',
            reserveBg: 'bg-orange-50',
            reserveText: 'text-orange-600',
            reserveBorder: 'border-orange-200'
        },
        purple: {
            // Using same styles as blue for now, but can be customized if needed
            timeBg: 'bg-gray-100',
            timeText: 'text-gray-500',
            seatsText: 'text-green-800',
            reserveBg: 'bg-orange-50',
            reserveText: 'text-orange-600',
            reserveBorder: 'border-orange-200'
        }
    }[variant];

    const isReserve = trip.driver.seatsOccupied === 0;
    const percentage = trip.driver.seatsTotal > 0
        ? Math.round((trip.driver.seatsOccupied / trip.driver.seatsTotal) * 100)
        : 0;

    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
                <div className={`${styles.timeBg} ${styles.timeText} px-3 py-1.5 rounded-xl font-medium text-lg`}>
                    {trip.time}
                </div>

                <div>
                    <h3 className="font-medium text-lg text-gray-900">{trip.driver.name}</h3>
                    <p className="text-gray-500 text-sm">{trip.driver.car} {trip.driver.plate}</p>
                </div>
            </div>

            {/* Status / Seats */}
            {isReserve ? (
                <div className={`${styles.reserveBg} ${styles.reserveText} border ${styles.reserveBorder} px-4 py-1.5 rounded-xl font-medium flex items-center gap-2`}>
                    Резерв
                    <Icon name="add-circle" className="w-5 h-5 text-orange-500" />
                </div>
            ) : (
                <div
                    className={`${styles.seatsText} px-4 py-1.5 rounded-xl font-medium flex items-center gap-2 relative overflow-hidden`}
                    style={{
                        background: `linear-gradient(to right, #dcfce7 ${percentage}%, #f3f4f6 ${percentage}%)`
                    }}
                >
                    <span className="relative z-10">{trip.driver.seatsOccupied} / {trip.driver.seatsTotal}</span>
                    <Icon name="add-circle" className="w-5 h-5 text-green-700 relative z-10" />
                </div>
            )}
        </div>
    );
};

export default TripCard;
