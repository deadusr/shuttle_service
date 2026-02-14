import { PassengerStatus } from '../../types';

interface StatusBadgeProps {
    status: PassengerStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
    const styles = {
        confirmed: 'bg-emerald-100 text-emerald-700',
        waiting: 'bg-amber-100 text-amber-700',
        cancelled: 'bg-red-100 text-red-700'
    };

    const labels = {
        confirmed: 'Подтвержден',
        waiting: 'Ожидание',
        cancelled: 'Отменен'
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
            {labels[status]}
        </span>
    );
};

export default StatusBadge;
