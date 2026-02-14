import { createFileRoute } from '@tanstack/react-router'
import DashboardHeader from '../components/DashboardHeader';
import TripCard from '../components/TripCard';
import { mockTrips } from '../data/mockTrips';
import { useUIStore } from '../store/uiStore';

export const Route = createFileRoute('/')({
  component: Dashboard,
})



function Dashboard() {
  const { isPassengerPanelCollapsed } = useUIStore();
  // Filter trips by direction
  const outboundTrips = mockTrips.filter(t => t.route.from === 'БОР' && t.route.to === 'СПБ');
  const inboundTrips = mockTrips.filter(t => t.route.from === 'СПБ' && t.route.to === 'БОР');

  return (
    <main className="flex-1 flex flex-col bg-gray-50/50 min-w-0 overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <div className="flex gap-8 h-full ">
          {/* Left Column: Outbound (Blue) */}
          <div className="max-w-xl w-full flex flex-col gap-4 bg-direction-forward-light/50 p-4 rounded-3xl">
            <div className="sticky top-0 z-10 backdrop-blur-sm py-2 rounded-t-xl">
              <h2 className="text-xl font-medium text-direction-forward flex items-center gap-2">
                БОР ➔ СПБ
              </h2>
            </div>

            <div className="flex flex-col gap-4 pb-6">
              {outboundTrips.map(trip => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  variant="blue"
                  size={isPassengerPanelCollapsed ? 'long' : 'short'}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Inbound (Purple) */}
          <div className="max-w-xl w-full flex flex-col gap-4 bg-direction-return-light/50 p-4 rounded-3xl">
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
                  size={isPassengerPanelCollapsed ? 'long' : 'short'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
