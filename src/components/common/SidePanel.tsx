import { Icon } from '../icons';

interface SidePanelProps {
    isCollapsed: boolean;
    onToggle: () => void;
    width?: string;
    children: React.ReactNode;
}

const SidePanel = ({ isCollapsed, onToggle, width = '380px', children }: SidePanelProps) => {
    if (isCollapsed) {
        return (
            <div className="fixed top-0 right-0 h-screen w-16 bg-white border-l border-gray-200 flex flex-col items-center py-4 z-40 transition-all duration-300">
                <button
                    onClick={onToggle}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors cursor-pointer"
                >
                    <Icon name="dock-left" className="w-6 h-6 rotate-180" />
                </button>
            </div>
        );
    }

    return (
        <div
            className="fixed top-0 right-0 h-screen bg-white border-l border-gray-200 flex flex-col z-40 transition-all duration-300 shadow-xl overflow-hidden font-sans"
            style={{ width }}
        >
            {/* Collapse Toggle */}
            <div className="px-4 pt-4 shrink-0">
                <button
                    onClick={onToggle}
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                    <Icon name="dock-left" className="w-5 h-5" />
                </button>
            </div>

            {children}
        </div>
    );
};

export default SidePanel;
