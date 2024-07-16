import React, { useState } from 'react';
import './css/UserDashboard.css';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="App">
      <Navbar onProfileClick={() => setSidebarOpen(true)} />
      <div className="d-flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Dashboard activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>
    </div>
  );
}

export default App;
