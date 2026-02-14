import type { SVGProps, FC } from 'react';
import DockLeftIcon from './svg/DockLeftIcon';
import HomeIcon from './svg/HomeIcon';
import SignOutIcon from './svg/SignOutIcon';

const icons: Record<string, FC<SVGProps<SVGSVGElement>>> = {
    'dock-left': DockLeftIcon,
    'home': HomeIcon,
    'sign-out': SignOutIcon,
};

type IconName = keyof typeof icons;

interface IconProps extends SVGProps<SVGSVGElement> {
    name: string;
}

const Icon: FC<IconProps> = ({ name, className, ...props }) => {
    const IconComponent = icons[name as IconName];

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }

    return <IconComponent className={className} {...props} />;
};

export { DockLeftIcon, HomeIcon, SignOutIcon };
export default Icon;
