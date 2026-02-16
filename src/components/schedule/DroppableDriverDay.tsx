
import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';
import { Driver, Trip } from '../../types';
import { checkTripAssignment } from '../../utils/tripUtils';
import { UnassignedTrip } from '../../types';
import { format } from 'date-fns';

interface DroppableDriverDayProps {
    driver: Driver;
    date: string;
    currentTrips: Trip[];
    children: ReactNode;
    className?: string;
}

export const DroppableDriverDay = ({
    driver,
    date,
    currentTrips,
    children,
    className
}: DroppableDriverDayProps) => {
    const { setNodeRef, isOver, active } = useDroppable({
        id: `driver-zone-${driver.id}-${date}`,
        data: {
            driver,
            currentTrips,
            date,
            type: 'driver-day-zone'
        }
    });

    // We can do client-side validation for highlighting here if we have access to the dragged trip object
    // But since we only store ID in the store, we rely on 'active' from dnd-kit which might have it in data

    let isCompatible = false;

    if (active?.data.current?.trip) {
        const draggedTrip = active.data.current.trip as UnassignedTrip;
        const tripDate = format(draggedTrip.departure, 'yyyy-MM-dd');

        if (tripDate === date) {
            // TODO: Ideally use date-fns comparisons instead of string comparison for robustness
            isCompatible = checkTripAssignment(driver, currentTrips, draggedTrip);
        }
    }


    return (
        <div
            ref={setNodeRef}
            className={`${className} transition-colors duration-200 ${isOver && isCompatible ? 'bg-indigo-50/50 ring-1 ring-indigo-100 rounded-lg' : ''}`}
        >
            {children}
        </div>
    );
};
