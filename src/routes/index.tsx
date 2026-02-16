import { createFileRoute, useSearch } from '@tanstack/react-router'
import TripCard from '../components/TripCard';
import { mockTrips } from '../data/mockTrips';
import { useUIStore } from '../store/uiStore';
import { useTrips } from '../hooks/useTrips';
import { useRoutes } from '../hooks/useRotes';
import { format } from 'date-fns';

export const Route = createFileRoute('/')({
  component: Dashboard,
})



function Dashboard() {
  const { isTripInfoPanelCollapsed, setSelectedTrip, setTripInfoPanelCollapsed } = useUIStore();
  const search = useSearch({ strict: false });
  const dateStr = (search.date as string) || format(new Date(), 'yyyy-MM-dd');

  const { data: routes } = useRoutes();

  const { data: trips } = useTrips(
    dateStr
  );

  console.log(trips);

  return (
    <main className="flex-1 flex flex-col bg-gray-100 min-w-0 overflow-hidden relative">
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <div className="flex gap-8 h-full ">

          {
            routes?.map(route => (
              <div style={{ background: route.from.color + "11" }} className="max-w-xl w-full flex flex-col gap-4 p-4 rounded-3xl">
                <div className="sticky top-0 z-10 backdrop-blur-sm py-2 rounded-t-xl">
                  <h2 style={{ color: route.from.color }} className="text-xl font-medium flex items-center gap-2">
                    {route.from.shortName} ➔ {route.to.shortName}
                  </h2>
                </div>

                <div className="flex flex-col gap-4 pb-6">
                  {trips?.filter(trip => trip.routeId === route.id).map(trip => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      size={isTripInfoPanelCollapsed ? 'long' : 'short'}
                      onClick={() => {
                        setSelectedTrip(trip);
                        setTripInfoPanelCollapsed(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            ))
          }

          {/* <div className="max-w-xl w-full flex flex-col gap-4 bg-direction-return-light/50 p-4 rounded-3xl">
            <div className="sticky top-0 z-10 backdrop-blur-sm py-2 rounded-t-xl">
              <h2 className="text-xl font-medium text-direction-return flex items-center gap-2">
                СПБ ➔ БОР
              </h2>
            </div>

            <div className="flex flex-col gap-4 pb-6">
              {inboundTrips.map(trip => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  variant="purple"
                  size={isTripInfoPanelCollapsed ? 'long' : 'short'}
                />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
};
