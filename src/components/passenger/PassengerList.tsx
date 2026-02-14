import { Passenger } from '../../types';
import PassengerItem from './PassengerItem';

interface PassengerListProps {
    passengers: Passenger[];
}

const PassengerList = ({ passengers }: PassengerListProps) => {
    return (
        <div className="flex flex-col gap-3">
            {passengers.map((passenger) => (
                <PassengerItem key={passenger.id} passenger={passenger} />
            ))}
        </div>
    );
};

export default PassengerList;
