
import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

interface DroppableDriverZoneProps {
    driverId: string;
    recommendedTripIds: string[];
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const DroppableDriverZone = ({
    driverId,
    recommendedTripIds,
    children,
    className,
    style
}: DroppableDriverZoneProps) => {
    const { setNodeRef, isOver } = useDroppable({
        id: `driver-zone-${driverId}`,
        data: {
            driverId,
            recommendedTripIds
        }
    });

    return (
        <div
            ref={setNodeRef}
            className={`${className} ${isOver ? 'bg-primary/5 ring-2 ring-primary/20 rounded-lg' : ''}`}
            style={style}
        >
            {children}
        </div>
    );
};
