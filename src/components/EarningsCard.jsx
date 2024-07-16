import React from 'react';
import './css/EarningsCard.css';

const EarningsCard = () => {
  return (
    <div className="card earnings-card">
      <h3>Earning Overview</h3>
      <div className="balance">
        <h2>$ 1000</h2>
        <p>Total Earned</p>
      </div>
      <div className="stats">
        <div className="stat-item">
          <i className="fas fa-coins"></i>
          <p>Points: <span>1200</span></p>
        </div>
        <div className="stat-item">
          <i className="fas fa-gift"></i>
          <p>Rewards: <span>3</span></p>
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress" style={{width: '60%'}}></div>
      </div>
      <p className="progress-text">60% to next reward</p>
      <button className="view-transactions">View Transactions</button>
    </div>
  );
};

export default EarningsCard;