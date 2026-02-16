import { forwardRef } from 'react';
import { Icon } from '../icons';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale/ru';
import { format, addDays, subDays, startOfWeek, endOfWeek, addWeeks, subWeeks } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

// Register Russian locale for date picker
registerLocale('ru', ru);

interface DateNavigatorProps {
    date: Date;
    onDateChange: (date: Date) => void;
    mode?: 'day' | 'week';
}

interface DateTriggerProps {
    value?: string;
    onClick?: () => void;
    label?: string;
    className?: string;
}

const DateTrigger = forwardRef<HTMLDivElement, DateTriggerProps>(({ onClick, label }, ref) => (
    <div
        ref={ref}
        onClick={onClick}
        className="flex items-center gap-2.5 px-4 py-1.5 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors group min-w-[180px] justify-center"
    >
        <span className="text-[15px] font-semibold text-gray-900 tracking-tight select-none">
            {label}
        </span>
        <Icon name="calendar" className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
    </div>
));

DateTrigger.displayName = 'DateTrigger';

const DateNavigator = ({ date, onDateChange, mode = 'day' }: DateNavigatorProps) => {

    const handlePrevClick = () => {
        if (mode === 'day') {
            onDateChange(subDays(date, 1));
        } else {
            onDateChange(subWeeks(date, 1));
        }
    };

    const handleNextClick = () => {
        if (mode === 'day') {
            onDateChange(addDays(date, 1));
        } else {
            onDateChange(addWeeks(date, 1));
        }
    };

    const formatDateDisplay = () => {
        if (mode === 'day') {
            return format(date, 'EEEE, d MMMM', { locale: ru });
        } else {
            const start = startOfWeek(date, { weekStartsOn: 1 });
            const end = endOfWeek(date, { weekStartsOn: 1 });
            // If same month: "12 - 18 февраля"
            if (start.getMonth() === end.getMonth()) {
                return `${format(start, 'd')} - ${format(end, 'd MMMM', { locale: ru })}`;
            } else {
                return `${format(start, 'd MMM', { locale: ru })} - ${format(end, 'd MMM', { locale: ru })}`;
            }
        }
    };

    // Capitalize first letter of the date string
    const dateString = formatDateDisplay();
    const capitalizedDateString = dateString.charAt(0).toUpperCase() + dateString.slice(1);

    return (
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] ring-1 ring-gray-100 relative z-30">
            <button
                onClick={handlePrevClick}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-700 transition-all active:scale-95"
                title={mode === 'day' ? "Предыдущий день" : "Предыдущая неделя"}
            >
                <Icon name="chevron" className="w-[18px] h-[18px] rotate-90" />
            </button>

            <div className={`relative tailwind-datepicker ${mode === 'week' ? 'mode-week' : 'mode-single'}`}>
                <DatePicker
                    selected={date}
                    onChange={(date: Date | null) => date && onDateChange(date)}
                    locale="ru"
                    showWeekPicker={mode === 'week'}
                    disabledKeyboardNavigation
                    showPopperArrow={false}
                    calendarClassName="shadow-lg rounded-xl border-0 font-sans"
                    customInput={<DateTrigger label={capitalizedDateString} />}
                />
            </div>

            <button
                onClick={handleNextClick}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-700 transition-all active:scale-95"
                title={mode === 'day' ? "Следующий день" : "Следующая неделя"}
            >
                <Icon name="chevron" className="w-[18px] h-[18px] -rotate-90" />
            </button>
        </div>
    );
};

export default DateNavigator;
