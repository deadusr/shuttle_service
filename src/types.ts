export interface Booking {
    id: string;
    client: {
        name: string;
        phone: string;
    };
    seatsBooked: number;
    price: number;
    comments: string;
}

export interface Trip {
    id: string;
    driver: Driver;
    car: Car;
    maxSeats: number;
    bookedSeats: number;
    departure: Date;
    status: 'en-route' | 'scheduled' | 'finished';
    price: number;
    statusLabel: string;
    routeId: string;
    route: {
        from: string;
        to: string;
    };
}

export interface Driver {
    id: string;
    name: string;
    phone: string;
}

export interface Car {
    id: string;
    name: string;
    plate: string;
}