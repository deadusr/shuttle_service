import { Trip } from '../types';

export const mockTrips: Trip[] = [
    // Outbound: BOR -> SPB
    {
        id: '1',
        route: { from: 'БОР', to: 'СПБ' },
        time: '05:00',
        status: 'finished',
        statusLabel: 'Ожидание',
        driver: {
            name: 'Иванов Иван',
            phone: '+7 999 000-00-00',
            car: 'Форд Кастом',
            plate: 'о225мс',
            seatsOccupied: 0,
            seatsTotal: 8
        },
        passengers: []
    },
    {
        id: '2',
        route: { from: 'БОР', to: 'СПБ' },
        time: '07:00',
        status: 'en-route',
        statusLabel: 'Выехал 23 минуты назад',
        driver: {
            name: 'Иванов Иван',
            phone: '+7 999 000-00-00',
            car: 'Форд Кастом',
            plate: 'о225мс',
            seatsOccupied: 5,
            seatsTotal: 8
        },
        passengers: []
    },
    {
        id: '3',
        route: { from: 'БОР', to: 'СПБ' },
        time: '09:00',
        status: 'scheduled',
        statusLabel: 'Ожидание',
        driver: {
            name: 'Иванов Иван',
            phone: '+7 999 000-00-00',
            car: 'Форд Кастом',
            plate: 'о225мс',
            seatsOccupied: 8,
            seatsTotal: 8
        },
        passengers: []
    },
    {
        id: '4',
        route: { from: 'БОР', to: 'СПБ' },
        time: '11:00',
        status: 'scheduled',
        statusLabel: 'Ожидание',
        driver: {
            name: 'Иванов Иван',
            phone: '+7 999 000-00-00',
            car: 'Форд Кастом',
            plate: 'о225мс',
            seatsOccupied: 5,
            seatsTotal: 8
        },
        passengers: []
    },
    {
        id: '5',
        route: { from: 'БОР', to: 'СПБ' },
        time: '13:00',
        status: 'scheduled',
        statusLabel: 'Ожидание',
        driver: {
            name: 'Иванов Иван',
            phone: '+7 999 000-00-00',
            car: 'Форд Кастом',
            plate: 'о225мс',
            seatsOccupied: 5,
            seatsTotal: 8
        },
        passengers: []
    },
    {
        id: '6',
        route: { from: 'БОР', to: 'СПБ' },
        time: '15:00',
        status: 'scheduled',
        statusLabel: 'Ожидание',
        driver: {
            name: 'Иванов Иван',
            phone: '+7 999 000-00-00',
            car: 'Форд Кастом',
            plate: 'о225мс',
            seatsOccupied: 5,
            seatsTotal: 8
        },
        passengers: []
    },
    {
        id: '7',
        route: { from: 'БОР', to: 'СПБ' },
        time: '17:00',
        status: 'scheduled',
        statusLabel: 'Ожидание',
        driver: {
            name: 'Иванов Иван',
            phone: '+7 999 000-00-00',
            car: 'Форд Кастом',
            plate: 'о225мс',
            seatsOccupied: 5,
            seatsTotal: 8
        },
        passengers: []
    },

    // Inbound: SPB -> BOR
    {
        id: '11',
        route: { from: 'СПБ', to: 'БОР' },
        time: '10:00',
        status: 'scheduled',
        statusLabel: 'Ожидание',
        driver: {
            name: 'Иванов Иван',
            phone: '+7 999 000-00-00',
            car: 'Форд Кастом',
            plate: 'о225мс',
            seatsOccupied: 5,
            seatsTotal: 8
        },
        passengers: []
    },
    {
        id: '12',
        route: { from: 'СПБ', to: 'БОР' },
        time: '12:00',
        status: 'scheduled',
        statusLabel: 'Ожидание',
        driver: {
            name: 'Иванов Иван',
            phone: '+7 999 000-00-00',
            car: 'Форд Кастом',
            plate: 'о225мс',
            seatsOccupied: 5,
            seatsTotal: 8
        },
        passengers: []
    },
    {
        id: '13',
        route: { from: 'СПБ', to: 'БОР' },
        time: '14:00',
        status: 'scheduled',
        statusLabel: 'Ожидание',
        driver: {
            name: 'Иванов Иван',
            phone: '+7 999 000-00-00',
            car: 'Форд Кастом',
            plate: 'о225мс',
            seatsOccupied: 5,
            seatsTotal: 8
        },
        passengers: []
    },
    {
        id: '14',
        route: { from: 'СПБ', to: 'БОР' },
        time: '16:00',
        status: 'scheduled',
        statusLabel: 'Ожидание',
        driver: {
            name: 'Иванов Иван',
            phone: '+7 999 000-00-00',
            car: 'Форд Кастом',
            plate: 'о225мс',
            seatsOccupied: 5,
            seatsTotal: 8
        },
        passengers: []
    },
];
