import Sidebar from './components/Sidebar';
import PassengerPanel from './components/PassengerPanel';

const App = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <PassengerPanel />
    </div>
  );
};

export default App;
