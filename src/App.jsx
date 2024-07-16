// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ChatBot from './components/ChatBot';
import './App.css';
import Help from './components/Help-Support-Page'
import Login from './components/Login'
import Signup from './components/Signup'
import UserDashboard from './components/UserDashboard'
import EarnPage from './components/EarnPage'
//app

const App = () => {
  return (
    <Router> 
      
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help-and-support" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/earn" element={<EarnPage />} />
          {/* Add other routes here */}
        </Routes>        
        <ChatBot />
      </div>
    </Router>
  );
};

export default App;
