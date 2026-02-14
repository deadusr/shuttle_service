import Logo from './logo';
import { Icon } from './icons';

import { Link, useRouterState } from '@tanstack/react-router';

const navItems = [
    { to: '/', icon: 'home', label: 'Главная' },
    { to: '/drivers', icon: 'car', label: 'Водители' },
];

const Sidebar = () => {
    // Get current path to highlight active link
    const router = useRouterState();
    const currentPath = router.location.pathname;

    return (
        <aside className="fixed top-0 left-0 w-[72px] h-screen flex flex-col bg-white border-r border-gray-200 z-50">
            {/* Logo */}
            <div className="flex items-center justify-center w-full py-3.5 shrink-0">
                <Logo />
            </div>

            {/* Navigation */}
            <nav className="flex flex-col items-center gap-1 py-2 flex-1">
                {navItems.map((item) => {
                    const isActive = currentPath === item.to || (item.to !== '/' && currentPath.startsWith(item.to));

                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center justify-center w-11 h-11 rounded-xl border-none cursor-pointer transition-all duration-200 ease-in-out ${isActive
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'
                                }`}
                            title={item.label}
                        >
                            <Icon name={item.icon as any} className="w-[22px] h-[22px]" />
                        </Link>
                    );
                })}
            </nav>

            {/* User Section */}
            <div className="flex flex-col items-center gap-2 pt-3 pb-4 shrink-0">
                <div
                    className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 text-[13px] font-semibold flex items-center justify-center cursor-pointer transition-transform duration-200 ease-in-out tracking-tight select-none hover:scale-[1.08]"
                    title="Юлия Александрова"
                >
                    ЮА
                </div>
                <button
                    className="flex items-center justify-center w-11 h-11 rounded-xl border-none bg-transparent text-gray-400 cursor-pointer transition-all duration-200 ease-in-out hover:text-red-500 hover:bg-red-50"
                    title="Выход"
                >
                    <Icon name="sign-out" className="w-[22px] h-[22px]" />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
