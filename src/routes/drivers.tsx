import { Outlet, createFileRoute, useSearch } from '@tanstack/react-router'
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  DragStartEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
  DropAnimation
} from '@dnd-kit/core';
import { useUpdateTrip } from '../hooks/useTrips';
import { UnassignedTrip, Driver, Trip } from '../types';
import TripChip from '../components/common/TripChip';
import { useState } from 'react';
import { checkTripAssignment } from '../utils/tripUtils';
import { useUIStore, LAYOUT_SIZES } from '../store/uiStore';
import { format } from 'date-fns';
import UnassignedTripsPanel from '../components/schedule/UnassignedTripsPanel';

export const Route = createFileRoute('/drivers')({
  component: DriversLayout,
})

function DriversLayout() {
  const [activeTrip, setActiveTrip] = useState<UnassignedTrip | null>(null);
  const updateTrip = useUpdateTrip();
  const { setDraggedTripId, setHighlightedTripId, isUnassignedPanelCollapsed } = useUIStore();
  const search = useSearch({ strict: false });
  const dateStr = (search.date as string) || format(new Date(), 'yyyy-MM-dd');
  const date = new Date(dateStr);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const trip = active.data.current?.trip as UnassignedTrip;
    if (trip) {
      setActiveTrip(trip);
      setDraggedTripId(trip.id);
      setHighlightedTripId(trip.id);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id) {
      const type = over.data.current?.type;

      if (type === 'driver-day-zone') {
        const driver = over.data.current?.driver as Driver;
        const currentTrips = over.data.current?.currentTrips as Trip[];
        const zoneDate = over.data.current?.date as string;
        const draggedTrip = active.data.current?.trip as UnassignedTrip;

        if (driver && currentTrips && draggedTrip && zoneDate) {
          const tripDate = format(draggedTrip.departure, 'yyyy-MM-dd');

          if (tripDate === zoneDate) {
            const isCompatible = checkTripAssignment(driver, currentTrips, draggedTrip);

            if (isCompatible) {
              setDropAnimation(null);
              updateTrip.mutate({ id: active.id as string, data: { driver: driver.id } });
            }
          }
        }
      }
    }

    setTimeout(() => {
      setDropAnimation({
        sideEffects: defaultDropAnimationSideEffects({
          styles: {
            active: {
              opacity: '0.5',
            },
          },
        }),
      });
    }, 50);

    setActiveTrip(null);
    setDraggedTripId(null);
    setHighlightedTripId(null);
  };

  const [dropAnimation, setDropAnimation] = useState<DropAnimation | null>({
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  });

  const marginRight = isUnassignedPanelCollapsed ? LAYOUT_SIZES.UNASSIGNED_PANEL_COLLAPSED : LAYOUT_SIZES.UNASSIGNED_PANEL_EXPANDED;

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-1 min-h-0 relative">
        <div
          className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
          style={{ marginRight }}
        >
          <Outlet />
        </div>
        <UnassignedTripsPanel currentDate={date} />
      </div>
      <DragOverlay dropAnimation={dropAnimation}>
        {activeTrip ? (
          <div style={{ transform: 'rotate(5deg)' }}>
            <TripChip trip={activeTrip} variant="default" isActive={true} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
