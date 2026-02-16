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
    route: Route;
}

export interface UnassignedTrip {
    id: string;
    maxSeats: number;
    bookedSeats: number;
    departure: Date;
    status: 'en-route' | 'scheduled' | 'finished';
    price: number;
    statusLabel: string;
    routeId: string;
    route: Route
}

export interface Route {
    id: string;
    name: string;
    from: {
        id: string;
        name: string;
        shortName: string;
        color: string;
    }
    to: {
        id: string;
        name: string;
        shortName: string;
        color: string;
    }
}

export interface Driver {
    id: string;
    name: string;
    phone: string;
    homeCityId: string;
}

export interface Car {
    id: string;
    name: string;
    plate: string;
}