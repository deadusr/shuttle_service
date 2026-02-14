export type PassengerStatus = 'confirmed' | 'waiting' | 'cancelled';

export interface Passenger {
    id: string;
    name: string;
    phone: string;
    location: string;
    seats: number; // e.g. 2
    seatLabel: string; // e.g. "1A, 1B"
    status: PassengerStatus;
    comment?: string;
    avatar?: string; // URL or initials if not provided
}

export interface Trip {
    id: string;
    route: {
        from: string;
        to: string;
    };
    time: string;
    status: 'en-route' | 'scheduled' | 'finished';
    statusLabel: string; // e.g. "В пути", "Выехал 23 минуты назад"
    driver: {
        name: string;
        phone: string;
        car: string; // "Ford Custom"
        plate: string; // "o225mc 53"
        seatsOccupied: number;
        seatsTotal: number;
    };
    passengers: Passenger[];
}
