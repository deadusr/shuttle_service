import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useUIStore } from '../store/uiStore';
import Sidebar from '../components/Sidebar';
import TripInfoPanel from '../components/TripInfoPanel';
import DashboardHeader from '../components/DashboardHeader';

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    const { isTripInfoPanelCollapsed } = useUIStore();

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div
                className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
                style={{
                    marginLeft: '72px',
                    marginRight: isTripInfoPanelCollapsed ? '64px' : '472px'
                }}
            >
                <DashboardHeader />

                <Outlet />
            </div>
            <TripInfoPanel />
        </div>

    )
}
