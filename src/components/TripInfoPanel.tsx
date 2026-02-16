import { useState } from 'react';
import { Icon } from './icons';
import { useUIStore } from '../store/uiStore';
import { useBookings } from '../hooks/useBookings';
import TripHeader from './trip/TripHeader';
import DriverCard from './trip/DriverCard';
import PassengerList from './passenger/PassengerList';

const TripInfoPanel = () => {
    const { isTripInfoPanelCollapsed, toggleTripInfoPanel, selectedTrip } = useUIStore();
    const { data: bookings } = useBookings(selectedTrip?.id || '');
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setIsScrolled(e.currentTarget.scrollTop > 40);
    };

    if (isTripInfoPanelCollapsed) {
        return (
            <div className="fixed top-0 right-0 h-screen w-16 bg-white border-l border-gray-200 flex flex-col items-center py-4 z-40 transition-all duration-300">
                <button
                    onClick={toggleTripInfoPanel}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                >
                    <Icon name="dock-left" className="w-6 h-6 rotate-180" />
                </button>
            </div>
        );
    }

    return (
        <div className="fixed top-0 right-0 h-screen w-[472px] bg-white border-l border-gray-200 flex flex-col z-40 transition-all duration-300 shadow-xl overflow-hidden font-sans">
            {/* Header / Collapse Toggle */}
            <div className="p-4 flex items-center justify-between shrink-0">
                <button
                    onClick={toggleTripInfoPanel}
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                    <Icon name="dock-left" className="w-5 h-5" />
                </button>
            </div>

            {!selectedTrip ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                    <Icon name="search" className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-lg font-medium">Выберите рейс для просмотра информации</p>
                </div>
            ) : (
                <>
                    {/* Scrolled Sticky Header */}
                    <div className={`absolute top-[68px] left-0 right-0 z-30 px-6 py-3 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
                        <div className="flex items-center gap-3 min-w-0">
                            <span className="text-lg font-bold text-gray-900 shrink-0">
                                {selectedTrip.departure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <div className="flex items-center gap-1.5 text-sm font-medium text-direction-forward truncate">
                                <span className="truncate">{selectedTrip.route.from}</span>
                                <span className="shrink-0">→</span>
                                <span className="truncate">{selectedTrip.route.to}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg shrink-0">
                            <Icon name="seat" className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{selectedTrip.bookedSeats}/{selectedTrip.maxSeats}</span>
                        </div>
                    </div>

                    <div
                        className="flex-1 flex flex-col gap-8 overflow-y-auto px-6 pb-6 scrollbar-hidden"
                        onScroll={handleScroll}
                    >
                        {/* Route Header */}
                        <TripHeader trip={selectedTrip} />

                        {/* Driver Card */}
                        <DriverCard trip={selectedTrip} />

                        {/* Passengers Header */}
                        <div className="">
                            <h2 className="text-lg font-medium text-gray-900">Пассажиры</h2>
                        </div>

                        {/* Passenger List */}
                        <PassengerList passengers={bookings || []} />

                    </div>

                    {/* Fixed Bottom Section */}
                    <div className="p-4 border-t border-gray-200 bg-white shrink-0 z-10">
                        <button className="w-full flex items-center justify-center gap-2 p-3 bg-direction-forward hover:bg-direction-forward/90 active:bg-direction-forward/80 text-white rounded-xl shadow-lg shadow-direction-forward/20 transition-all duration-200 transform hover:-translate-y-0.5">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                <Icon name="person-add" className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-bold">Добавить пассажира</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TripInfoPanel;

