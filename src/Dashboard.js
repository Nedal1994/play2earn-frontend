// Dashboard.js
import React, { useState } from 'react';
import './Dashboard.css';
import ChangePasswordModal from './ChangePasswordModal'; 

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false); 

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  

  return (
    <div className="dashboard">
      <div className="card profile-card">
        <div className="icon">
          <img src="https://via.placeholder.com/50" alt="User Icon" />
        </div>
        <div className="details">
          <h2>User Name</h2>
          <p>Current Level <span>1</span></p>
          <p>Participating Tasks <span>4</span></p>
        </div>
      </div>
      
      <div className="card earning-card">
        <h3>Earning Overviews</h3>
        <p><strong>Points:</strong> 1200</p>
        <p><strong>Rewards:</strong> 3</p>
        <p><strong>Total Earned</strong> ₿ 1000</p>
        <a href="#transactions">View Transactions</a>
      </div>

      <div className="card stats-card">
        <h3>AI Contribution Stats</h3>
        <p>Tasks Completed <span>1</span></p>
        <p>AI Model Improved <span>100</span></p>
      </div>

    

      
      <ChangePasswordModal isOpen={showModal} onClose={closeModal} />
    </div>
  );
};

export default Dashboard;
