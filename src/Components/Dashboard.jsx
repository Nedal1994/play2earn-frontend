// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileSection from './ProfileSection';
import TasksSection from './TasksSection';
import SocialAccountsSection from './SocialAccountsSection';
import './CSS/Dashboard.css';

const API_BASE_URL = 'http://localhost:5001/api';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [earningsData, setEarningsData] = useState(null);
  const [aiContributionData, setAiContributionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [usersResponse, earningsResponse, aiContributionResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/users`),
          axios.get(`${API_BASE_URL}/earnings`),
          axios.get(`${API_BASE_URL}/aicontributions`)
        ]);

        // Assuming we want to display data for the first user
        const user = usersResponse.data[0];
        const userEarnings = earningsResponse.data.find(e => e.userId === user._id);
        const userAiContribution = aiContributionResponse.data.find(a => a.username === user.username);

        setUserData(user);
        setEarningsData(userEarnings);
        setAiContributionData(userAiContribution);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to load data. ${error.response?.data?.message || error.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard">
      <div className="navigation-buttons">
        <button onClick={() => setActiveSection('profile')}>My Profile</button>
        <button onClick={() => setActiveSection('tasks')}>Task Rewards</button>
        <button onClick={() => setActiveSection('social')}>Social Accounts</button>
      </div>
      <div className="dashboard-content">
        {activeSection === 'profile' && <ProfileSection userData={userData} earningsData={earningsData} aiContributionData={aiContributionData} />}
        {activeSection === 'tasks' && <TasksSection />}
        {activeSection === 'social' && <SocialAccountsSection />}
      </div>
    </div>
  );
};

export default Dashboard;