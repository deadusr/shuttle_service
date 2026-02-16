import { useState } from 'react';
import { Icon } from './icons';
import DatePicker from './DatePicker';

interface DashboardHeaderProps {
    onSearch?: (query: string) => void;
    date: Date;
    onDateChange: (date: Date) => void;
    mode?: 'day' | 'week';
    onViewChange?: (view: 'list' | 'car') => void;
}

const DashboardHeader = ({ onSearch, date, onDateChange, mode = 'day', onViewChange }: DashboardHeaderProps) => {
    const [view, setView] = useState<'list' | 'car'>('list');
    const [searchQuery, setSearchQuery] = useState('');

    const handleViewChange = (newView: 'list' | 'car') => {
        setView(newView);
        onViewChange?.(newView);
    };

    return (
        <div className="flex items-center justify-between px-8 py-5 gap-6 sticky top-0 z-20 bg-gray-50/80 backdrop-blur-sm">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-xl group">
                <input
                    type="text"
                    placeholder="Поиск пассажира, водителя или рейса..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        onSearch?.(e.target.value);
                    }}
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl text-[15px] text-gray-900 placeholder-gray-400/80 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] ring-1 ring-gray-100 hover:ring-gray-200 focus:ring-2 focus:ring-direction-forward/20 focus:outline-none transition-all duration-200 ease-out font-medium"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-direction-forward transition-colors duration-200">
                    <Icon name="search" className="w-[18px] h-[18px]" />
                </div>
            </div>

            {/* Date Navigator */}
            <DatePicker date={date} onDateChange={onDateChange} mode={mode} />

            {/* View Switcher */}
            <div className="flex items-center p-1 bg-white rounded-2xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] ring-1 ring-gray-100">
                <button
                    onClick={() => handleViewChange('list')}
                    className={`nav-item flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ease-out select-none ${view === 'list'
                        ? 'bg-gray-900 text-white shadow-md shadow-gray-900/10 scale-[1.02]'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                >
                    <Icon name="timeline" className={`w-[18px] h-[18px] ${view === 'list' ? 'text-white' : 'text-gray-400'}`} />
                    <span>Список</span>
                </button>
                <div className="w-px h-5 bg-gray-100 mx-1"></div>
                <button
                    onClick={() => handleViewChange('car')}
                    className={`nav-item flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ease-out select-none ${view === 'car'
                        ? 'bg-gray-900 text-white shadow-md shadow-gray-900/10 scale-[1.02]'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                >
                    <Icon name="car" className={`w-[18px] h-[18px] ${view === 'car' ? 'text-white' : 'text-gray-400'}`} />
                    <span>Карта</span>
                </button>
            </div>
        </div>
    );
};

export default DashboardHeader;
