import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Sidebar from './Components/Sidebar';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please refresh the page.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('profile');

  return (
    <ErrorBoundary>
      <div className="App">
        <Navbar onProfileClick={() => setSidebarOpen(true)} />
        <div className="d-flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <Dashboard activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;