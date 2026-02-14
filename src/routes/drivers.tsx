import { createFileRoute } from '@tanstack/react-router'
import DriverScheduleTable from '../components/schedule/DriverScheduleTable'

export const Route = createFileRoute('/drivers')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex-1 flex flex-col bg-gray-100 min-w-0 overflow-hidden relative">
      <DriverScheduleTable />
    </main>
  )
}

