import DockLeftIcon from './svg/DockLeftIcon';
import HomeIcon from './svg/HomeIcon';
import SignOutIcon from './svg/SignOutIcon';

const icons = {
    'dock-left': DockLeftIcon,
    'home': HomeIcon,
    'sign-out': SignOutIcon,
};

const Icon = ({ name, className, ...props }) => {
    const IconComponent = icons[name];

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }

    return <IconComponent className={className} {...props} />;
};

export { DockLeftIcon, HomeIcon, SignOutIcon };
export default Icon;
