import { useUIStore } from './store/uiStore';
import Sidebar from './components/Sidebar';
import PassengerPanel from './components/PassengerPanel';
import Dashboard from './routes/Dashboard';

const App = () => {
  const { isPassengerPanelCollapsed } = useUIStore();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
        style={{
          marginLeft: '72px',
          marginRight: isPassengerPanelCollapsed ? '64px' : '472px'
        }}
      >
        <Dashboard />
      </div>
      <PassengerPanel />
    </div>
  );
};

export default App;
