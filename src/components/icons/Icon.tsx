import type { SVGProps, FC } from 'react';
import AddCircleIcon from './svg/AddCircleIcon';
import CalendarIcon from './svg/CalendarIcon';
import CarIcon from './svg/CarIcon';
import ChevronIcon, { ChevronDirection } from './svg/ChevronIcon';
import ChevronCircleIcon from './svg/ChevronCircleIcon';
import CommentIcon from './svg/CommentIcon';
import DockLeftIcon from './svg/DockLeftIcon';
import HomeIcon from './svg/HomeIcon';
import LocationIcon from './svg/LocationIcon';
import PersonAddIcon from './svg/PersonAddIcon';
import SearchIcon from './svg/SearchIcon';
import SeatIcon from './svg/SeatIcon';
import SignOutIcon from './svg/SignOutIcon';
import TimelineIcon from './svg/TimelineIcon';


export type Icons =
    "add-circle" |
    "calendar" |
    "car" |
    "chevron" |
    "chevron-circle" |
    "comment" |
    "dock-left" |
    "home" |
    "location" |
    "person-add" |
    "search" |
    "seat" |
    "sign-out" |
    "timeline";

interface IconProps extends SVGProps<SVGSVGElement> {
    name: Icons;
    direction?: ChevronDirection

}

const Icon: FC<IconProps> = ({ name, className, ...props }) => {
    switch (name) {
        case 'add-circle':
            return <AddCircleIcon className={className} {...props} />;
        case 'calendar':
            return <CalendarIcon className={className} {...props} />;
        case 'car':
            return <CarIcon className={className} {...props} />;
        case 'chevron':
            return <ChevronIcon className={className} {...props} />;
        case 'chevron-circle':
            return <ChevronCircleIcon className={className} {...props} />;
        case 'comment':
            return <CommentIcon className={className} {...props} />;
        case 'dock-left':
            return <DockLeftIcon className={className} {...props} />;
        case 'home':
            return <HomeIcon className={className} {...props} />;
        case 'location':
            return <LocationIcon className={className} {...props} />;
        case 'person-add':
            return <PersonAddIcon className={className} {...props} />;
        case 'search':
            return <SearchIcon className={className} {...props} />;
        case 'seat':
            return <SeatIcon className={className} {...props} />;
        case 'sign-out':
            return <SignOutIcon className={className} {...props} />;
        case 'timeline':
            return <TimelineIcon className={className} {...props} />;
    }
};

export {
    AddCircleIcon,
    CalendarIcon,
    CarIcon,
    ChevronIcon,
    ChevronCircleIcon,
    CommentIcon,
    DockLeftIcon,
    HomeIcon,
    LocationIcon,
    PersonAddIcon,
    SearchIcon,
    SeatIcon,
    SignOutIcon,
    TimelineIcon,
};

export default Icon;
