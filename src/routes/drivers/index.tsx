import { createFileRoute, useSearch } from '@tanstack/react-router'
import DriverScheduleTable from '../../components/schedule/DriverScheduleTable'
import { format, startOfWeek } from 'date-fns'

export const Route = createFileRoute('/drivers/')({
    component: RouteComponent,
})

function RouteComponent() {
    const search = useSearch({ strict: false });
    const dateStr = (search.date as string) || format(new Date(), 'yyyy-MM-dd');
    const startDate = startOfWeek(new Date(dateStr), { weekStartsOn: 1 });

    return (
        <main className="flex-1 flex flex-col bg-gray-100 min-w-0 overflow-hidden relative">
            <DriverScheduleTable startDate={startDate} />
        </main>
    )
}
