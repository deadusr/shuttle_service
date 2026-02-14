import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-[72px] flex-1 bg-slate-50 min-h-screen">
        {/* Основной контент */}
      </main>
    </div>
  );
};

export default App;
