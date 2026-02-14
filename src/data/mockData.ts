import { Passenger, Trip } from '../types';

export const mockPassengers: Passenger[] = [
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

export const mockTrip: Trip = {
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

export const mockDrivers = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    name: `Водитель ${i + 1}`,
    trips: i == 0 ? [] : i % 2 === 0 ? [1, 2] : [1]
}));
