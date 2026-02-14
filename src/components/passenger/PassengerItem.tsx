import { Passenger } from '../../types';
import { Icon } from '../icons';
import StatusBadge from '../common/StatusBadge';

interface PassengerItemProps {
    passenger: Passenger;
}

const PassengerItem = ({ passenger }: PassengerItemProps) => {
    return (
        <div className="group bg-white rounded-xl flex flex-col gap-3 border border-gray-200 p-4  hover:shadow-sm hover:border-direction-forward-light transition-all cursor-pointer relative">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${passenger.avatar ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'
                        }`}>
                        {passenger.avatar || ''}
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900">{passenger.name}</h3>
                        <p className="text-base text-gray-500 font-medium font-mono">{passenger.phone}</p>
                    </div>
                </div>
                <StatusBadge status={passenger.status} />
            </div>

            <div className="space-y-2">
                {passenger.location && (
                    <div className="flex items-start gap-2">
                        <Icon name="location" className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                        <p className="text-sm text-gray-900 leading-tight">
                            {passenger.location}
                        </p>
                    </div>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-900">
                    <div className="flex items-center gap-1.5">
                        <Icon name="seat" className="w-4 h-4 text-gray-400" />
                        <span>{passenger.seats} места ({passenger.seatLabel})</span>
                    </div>
                </div>

                {passenger.comment && (
                    <div className="flex items-center gap-2 pt-1">
                        <Icon name="comment" className="w-4 h-4 text-gray-400" />
                        <p className="text-xs text-gray-500 font-medium italic">
                            {passenger.comment}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PassengerItem;
