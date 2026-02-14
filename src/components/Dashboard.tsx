import DashboardHeader from './DashboardHeader';

const Dashboard = () => {
    return (
        <main className="flex-1 flex flex-col bg-gray-50/50 min-w-0 overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            <DashboardHeader />

            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {/* Content Placeholder */}
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </div>
                    <p className="font-medium text-lg">Выберите рейс для просмотра деталей</p>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
