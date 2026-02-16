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

export const Route = createRootRoute({
    component: RootComponent,
    validateSearch: (search: Record<string, unknown>): RootSearch => {
        return {
            date: typeof search.date === 'string' ? search.date : undefined,
        }
    },
})

function RootComponent() {
    const { isTripInfoPanelCollapsed, isUnassignedPanelCollapsed } = useUIStore()
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
                <DashboardHeader
                    date={date}
                    onDateChange={handleDateChange}
                    mode={mode}
                />
                <Outlet />
            </div>
            {isDriversPage ? <UnassignedTripsPanel /> : <TripInfoPanel />}
        </div>
    )
}
