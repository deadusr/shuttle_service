import Logo from './logo';
import { Icon } from './icons';

interface NavItem {
    icon: string;
    label: string;
    active?: boolean;
}

const navItems: NavItem[] = [
    { icon: 'home', label: 'Главная', active: true },
];

const Sidebar = () => {
    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="sidebar__logo">
                <Logo />
            </div>

            {/* Navigation */}
            <nav className="sidebar__nav">
                {navItems.map((item) => (
                    <button
                        key={item.icon}
                        className={`sidebar__nav-item ${item.active ? 'sidebar__nav-item--active' : ''}`}
                        title={item.label}
                    >
                        <Icon name={item.icon} className="sidebar__icon" />
                    </button>
                ))}
            </nav>

            {/* User Section */}
            <div className="sidebar__footer">
                <div className="sidebar__avatar" title="Юлия Александрова">
                    ЮА
                </div>
                <button className="sidebar__nav-item sidebar__sign-out" title="Выход">
                    <Icon name="sign-out" className="sidebar__icon" />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
