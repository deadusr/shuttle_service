import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { useUIStore } from '../store/uiStore';
import Sidebar from '../components/Sidebar';
import TripInfoPanel from '../components/TripInfoPanel';
import UnassignedTripsPanel from '../components/schedule/UnassignedTripsPanel';
import DashboardHeader from '../components/DashboardHeader';

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    const { isTripInfoPanelCollapsed, isUnassignedPanelCollapsed } = useUIStore();
    const router = useRouterState();
    const isDriversPage = router.location.pathname === '/drivers' || router.location.pathname.startsWith('/drivers/');

    const marginRight = isDriversPage
        ? (isUnassignedPanelCollapsed ? '64px' : '380px')
        : (isTripInfoPanelCollapsed ? '64px' : '472px');

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div
                className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
                style={{
                    marginLeft: '72px',
                    marginRight
                }}
            >
                <DashboardHeader />

                <Outlet />
            </div>
            {isDriversPage ? <UnassignedTripsPanel /> : <TripInfoPanel />}
        </div>

    )
}
