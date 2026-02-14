import { useState } from 'react';
import Sidebar from './components/Sidebar';
import PassengerPanel from './components/PassengerPanel';
import Dashboard from './components/Dashboard';

const App = () => {
  const [isPassengerPanelCollapsed, setIsPassengerPanelCollapsed] = useState(false);

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
      <PassengerPanel
        isCollapsed={isPassengerPanelCollapsed}
        onToggle={() => setIsPassengerPanelCollapsed(!isPassengerPanelCollapsed)}
      />
    </div>
  );
};

export default App;
