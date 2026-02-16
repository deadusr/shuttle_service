import { Booking } from '../../types';
import PassengerItem from './PassengerItem';

interface PassengerListProps {
    passengers: Booking[];
}

const PassengerList = ({ passengers }: PassengerListProps) => {
    return (
        <div className="flex flex-col gap-3">
            {passengers.map((booking) => (
                <PassengerItem key={booking.id} booking={booking} />
            ))}
        </div>
    );
};

export default PassengerList;
