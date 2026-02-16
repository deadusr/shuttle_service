
import { useDraggable } from '@dnd-kit/core';
import type { UnassignedTrip } from '../../../types';
import TripChip from '../../common/TripChip';
import { useUIStore } from '../../../store/uiStore';
import { useEffect } from 'react';

interface DraggableTripChipProps {
    trip: UnassignedTrip;
    isActive?: boolean;
    onClick?: () => void;
}

export const DraggableTripChip = ({ trip, isActive, onClick }: DraggableTripChipProps) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: trip.id,
        data: { trip }
    });

    const { setDraggedTripId, setHighlightedTripId } = useUIStore();

    useEffect(() => {
        if (isDragging) {
            setDraggedTripId(trip.id);
            setHighlightedTripId(trip.id);
        }
    }, [isDragging, trip.id, setDraggedTripId, setHighlightedTripId]);

    const style = isDragging ? {
        opacity: 0.5,
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <TripChip
                trip={trip}
                isActive={isActive}
                onClick={onClick}
                variant="default"
            />
        </div>
    );
};
