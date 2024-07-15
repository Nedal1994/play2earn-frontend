// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ChatBot from './components/ChatBot';
import './App.css';
import Survey from './components/Survey'
import Login from './components/Login'
import Signup from './components/Signup'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Add other routes here */}
        </Routes>
        <ChatBot />
      </div>
    </Router>
  );
};

export default App;
