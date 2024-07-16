// components/Dashboard.js
import React, { useState } from 'react';
import ProfileSection from './ProfileSection';
import TasksSection from './TasksSection';
import SocialAccountsSection from './SocialAccountsSection';
import './css/Dashboard.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="dashboard">
      <div className="navigation-buttons">
        <button
          className={`nav-button ${activeSection === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveSection('profile')}
        >
          <i className="fas fa-user"></i>
          My Profile
        </button>
        <button
          className={`nav-button ${activeSection === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveSection('tasks')}
        >
          <i className="fas fa-tasks"></i>
          Task Rewards
        </button>
        <button
          className={`nav-button ${activeSection === 'social' ? 'active' : ''}`}
          onClick={() => setActiveSection('social')}
        >
          <i className="fas fa-users"></i>
          Social Accounts
        </button>
      </div>
      <div className="dashboard-content">
        {activeSection === 'profile' && <ProfileSection />}
        {activeSection === 'tasks' && <TasksSection />}
        {activeSection === 'social' && <SocialAccountsSection />}
      </div>
    </div>
  );
};

export default Dashboard;