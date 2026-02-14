import { useState } from 'react'
import Logo from './components/logo';

function App() {

  return (
    <div className="bg-slate-50 container mx-auto">
      <nav className="flex justify-between items-center flex-col bg-white">
        <div className="logo w-11 h-11">
          <Logo />
        </div>
      </nav>
    </div>
  );
}

export default App
