import { Outlet, createRootRoute, useNavigate, useRouterState, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'
import { pb } from '../lib/pocketbase'
import { useAuthStore } from '../store/authStore'
import { useUIStore } from '../store/uiStore'
import Sidebar from '../components/Sidebar'
import TripInfoPanel from '../components/TripInfoPanel'
import UnassignedTripsPanel from '../components/schedule/UnassignedTripsPanel'
import DashboardHeader from '../components/DashboardHeader'
import { format } from 'date-fns'

interface RootSearch {
    date?: string
}

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

export const Route = createRootRoute({
    component: RootComponent,
    validateSearch: (search: Record<string, unknown>): RootSearch => {
        return {
            date: typeof search.date === 'string' ? search.date : undefined,
        }
    },
})

function RootComponent() {
    const { isTripInfoPanelCollapsed, isUnassignedPanelCollapsed, setDraggedTripId, setHighlightedTripId } = useUIStore()
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
    const router = useRouterState()
    const navigate = useNavigate()
    const search = useSearch({ from: Route.id })

    const date = search.date ? new Date(search.date) : new Date()

    const isLoginPage = router.location.pathname === '/login'
    const isDriversPage = router.location.pathname === '/drivers' || router.location.pathname.startsWith('/drivers/')

    const mode = isDriversPage ? 'week' : 'day'

    const handleDateChange = (newDate: Date) => {
        navigate({
            to: '.',
            search: (old: RootSearch) => ({
                ...old,
                date: format(newDate, 'yyyy-MM-dd'),
            }),
        })
    }

    const [activeTrip, setActiveTrip] = useState<UnassignedTrip | null>(null);
    const updateTrip = useUpdateTrip();

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
                const draggedTrip = active.data.current?.trip as UnassignedTrip;

                if (driver && currentTrips && draggedTrip) {
                    const isCompatible = checkTripAssignment(driver, currentTrips, draggedTrip);

                    if (isCompatible) {
                        setDropAnimation(null);
                        updateTrip.mutate({ id: active.id as string, data: { driver: driver.id } });
                    }
                }
            }
        }

        // Reset animation for next drag after a small delay or immediately if we want default
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

    // Redirect to /login if not authenticated
    useEffect(() => {
        if (!pb.authStore.isValid && !isLoginPage) {
            navigate({ to: '/login' })
        }
    }, [isAuthenticated, isLoginPage, navigate])

    // Login page — render without layout
    if (isLoginPage) {
        return <Outlet />
    }

    // Not authenticated and not on login — show nothing while redirecting
    if (!pb.authStore.isValid) {
        return null
    }

    const marginRight = isDriversPage
        ? (isUnassignedPanelCollapsed ? '64px' : '380px')
        : (isTripInfoPanelCollapsed ? '64px' : '472px')

    const [dropAnimation, setDropAnimation] = useState<DropAnimation | null>({
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    });

    return (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div
                    className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
                    style={{
                        marginLeft: '72px',
                        marginRight
                    }}
                >
                    <DashboardHeader
                        date={date}
                        onDateChange={handleDateChange}
                        mode={mode}
                    />
                    <Outlet />
                </div>
                {isDriversPage ? <UnassignedTripsPanel currentDate={date} /> : <TripInfoPanel />}
            </div>
            <DragOverlay dropAnimation={dropAnimation}>
                {activeTrip ? (
                    <div style={{ transform: 'rotate(5deg)' }}>
                        <TripChip trip={activeTrip} variant="default" isActive={true} />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}
