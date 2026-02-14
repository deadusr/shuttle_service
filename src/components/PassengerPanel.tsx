import { useState } from 'react';
import { Icon } from './icons';
import { Trip, Passenger, PassengerStatus } from '../types';

// Mock Data
const mockPassengers: Passenger[] = [
    {
        id: '1',
        name: 'Лебедев Юрий',
        phone: '+79082923921',
        location: 'Сушанская "Пятерочка"',
        seats: 2,
        seatLabel: '1A, 1B',
        status: 'waiting',
        comment: 'С багажом нужна помощь',
        avatar: 'ЛЮ'
    },
    {
        id: '2',
        name: 'Лебедев Юрий',
        phone: '+79082923921',
        location: 'У моста',
        seats: 2,
        seatLabel: '1A, 1B',
        status: 'confirmed',
        comment: 'С багажом нужна помощь',
        avatar: 'ЛЮ'
    },
    {
        id: '3',
        name: 'Лебедев Юрий',
        phone: '+79082923921',
        location: 'Пушкинская 17, 2 подьезд',
        seats: 2,
        seatLabel: '1A, 1B',
        status: 'confirmed',
        comment: 'С багажом нужна помощь'
    },
    {
        id: '4',
        name: 'Лебедев Юрий',
        phone: '+79082923921',
        location: 'АДК',
        seats: 1,
        seatLabel: '',
        status: 'confirmed',
        avatar: ''
    }
];

const mockTrip: Trip = {
    id: '1',
    route: { from: 'Боровичи', to: 'Санкт Петербург' },
    time: '06:00',
    status: 'en-route',
    statusLabel: 'Выехал 23 минуты назад',
    driver: {
        name: 'Иванов И.И.',
        phone: '+79082923921',
        car: 'Ford Custom',
        plate: 'o225mc53',
        seatsOccupied: 6,
        seatsTotal: 8
    },
    passengers: mockPassengers
};

const StatusBadge = ({ status }: { status: PassengerStatus }) => {
    const styles = {
        confirmed: 'bg-emerald-100 text-emerald-700',
        waiting: 'bg-amber-100 text-amber-700',
        cancelled: 'bg-red-100 text-red-700'
    };

    const labels = {
        confirmed: 'Подтвержден',
        waiting: 'Ожидание',
        cancelled: 'Отменен'
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
            {labels[status]}
        </span>
    );
};

import { useUIStore } from '../store/uiStore';

const PassengerPanel = () => {
    // const [isCollapsed, setIsCollapsed] = useState(false); // Removed local state
    const { isPassengerPanelCollapsed, togglePassengerPanel } = useUIStore();
    const [trip] = useState<Trip>(mockTrip);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setIsScrolled(e.currentTarget.scrollTop > 40);
    };

    if (isPassengerPanelCollapsed) {
        return (
            <div className="fixed top-0 right-0 h-screen w-16 bg-white border-l border-gray-200 flex flex-col items-center py-4 z-40 transition-all duration-300">
                <button
                    onClick={togglePassengerPanel}
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
                    onClick={togglePassengerPanel}
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                    <Icon name="dock-left" className="w-5 h-5" />
                </button>
            </div>

            {/* Scrolled Sticky Header */}
            <div className={`absolute top-[68px] left-0 right-0 z-30 px-6 py-3 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
                <div className="flex items-center gap-3 min-w-0">
                    <span className="text-lg font-bold text-gray-900 shrink-0">{trip.time}</span>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-direction-forward truncate">
                        <span className="truncate">{trip.route.from}</span>
                        <span className="shrink-0">→</span>
                        <span className="truncate">{trip.route.to}</span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg shrink-0">
                    <Icon name="seat" className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{trip.driver.seatsOccupied}/{trip.driver.seatsTotal}</span>
                </div>
            </div>

            <div
                className="flex-1 flex flex-col gap-8 overflow-y-auto px-6 pb-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
                onScroll={handleScroll}
            >
                {/* Route Header */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-xl font-bold text-gray-900">{trip.time}</span>
                        <div className="flex items-center gap-1.5 text-xl font-medium text-direction-forward">
                            <span>{trip.route.from}</span>
                            <Icon name="search" className="w-4 h-4 text-direction-forward/70 rotate-90 hidden" /> {/* Arrow placeholder if needed */}
                            <span>→</span>
                            <span>{trip.route.to}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1.5 px-4 py-2 rounded bg-emerald-50 text-emerald-600 font-medium">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            В пути
                        </div>
                        <span className="text-gray-500">{trip.statusLabel}</span>
                    </div>
                </div>

                {/* Driver Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-start gap-3 relative">
                        <div className="flex-1 flex flex-col gap-0">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm shrink-0">
                                    ИИ
                                </div>
                                <h3 className="text-sm font-medium text-gray-900 truncate">{trip.driver.name}</h3>
                            </div>
                            <p className=" pl-12 text-gray-700 font-medium font-mono">{trip.driver.phone}</p>
                        </div>
                        <div className="w-px h-full bg-gray-200 absolute right-1/2"></div>

                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-slate-900">
                                <span className="text-xs">{trip.driver.car}</span> {" "}
                                <span className="font-bold font-mono">{trip.driver.plate}</span>
                            </p>
                            <div className="flex items-center gap-3">
                                {/* Seats Visualizer */}
                                <div className="flex gap-px h-4">
                                    {Array.from({ length: trip.driver.seatsTotal }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-3 h-full rounded-sm first:rounded-l last:rounded-r ${i < trip.driver.seatsOccupied ? 'bg-emerald-500' : 'bg-gray-200'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm font-medium text-slate-900">
                                    {trip.driver.seatsOccupied}/{trip.driver.seatsTotal} мест
                                </span>
                            </div>
                        </div>

                    </div>


                </div>

                {/* Passengers Header */}
                <div className="">
                    <h2 className="text-lg font-medium text-gray-900">Пассажиры</h2>
                </div>

                {/* Passenger List */}
                <div className="flex flex-col gap-3">
                    {trip.passengers.map((passenger) => (
                        <div key={passenger.id} className="group bg-white rounded-xl flex flex-col gap-3 border border-gray-200 p-4  hover:shadow-sm hover:border-direction-forward-light transition-all cursor-pointer relative">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${passenger.avatar ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'
                                        }`}>
                                        {passenger.avatar || ''}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900">{passenger.name}</h3>
                                        <p className="text-base text-gray-500 font-medium font-mono">{passenger.phone}</p>
                                    </div>
                                </div>
                                <StatusBadge status={passenger.status} />
                            </div>

                            <div className="space-y-2">
                                {passenger.location && (
                                    <div className="flex items-start gap-2">
                                        <Icon name="location" className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                        <p className="text-sm text-gray-900 leading-tight">
                                            {passenger.location}
                                        </p>
                                    </div>
                                )}

                                <div className="flex items-center gap-4 text-sm text-gray-900">
                                    <div className="flex items-center gap-1.5">
                                        <Icon name="seat" className="w-4 h-4 text-gray-400" />
                                        <span>{passenger.seats} места ({passenger.seatLabel})</span>
                                    </div>
                                </div>

                                {passenger.comment && (
                                    <div className="flex items-center gap-2 pt-1">
                                        <Icon name="comment" className="w-4 h-4 text-gray-400" />
                                        <p className="text-xs text-gray-500 font-medium italic">
                                            {passenger.comment}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                </div>
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
        </div>
    );
};

export default PassengerPanel;
