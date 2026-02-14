
import Logo from './components/logo';
import { Icon } from './components/icons';

function App() {

  return (
    <div className="bg-slate-50 container mx-auto">
      <nav className="flex justify-between items-center flex-col bg-white">
        <div className="logo w-11 h-11">
          <Logo />

          <Icon name="home" className="w-5 h-5 text-red-300" />
          <Icon name="dock-left" className="w-5 h-5 text-red-300" />
          <Icon name="sign-out" className="w-5 h-5 text-red-300" />
        </div>
      </nav>
    </div>
  );
}

export default App
