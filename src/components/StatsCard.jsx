import React from 'react';
import './css/StatsCard.css';

const StatsCard = () => {
  return (
    <div className="card stats-card">
      <h3>AI Contribution Stats</h3>
      <div className="stat-circles">
        <div className="stat-circle">
          <svg viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#1F26F2"
              strokeWidth="2"
              strokeDasharray="25, 100"
            />
          </svg>
          <div className="stat-number">1</div>
          <p>Tasks Completed</p>
        </div>
        <div className="stat-circle">
          <svg viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#1F26F2"
              strokeWidth="2"
              strokeDasharray="100, 100"
            />
          </svg>
          <div className="stat-number">100</div>
          <p>AI Model Improved</p>
        </div>
      </div>
      <div className="user-stats">
        <div className="stat-item">
          <p>Total Users: <span>100</span></p>
        </div>
        <div className="stat-item">
          <p>Average Age: <span>36.6</span></p>
        </div>
        <div className="stat-item">
          <p>Top Country: <span>Ecuador</span></p>
        </div>
        <div className="stat-item">
          <p>Users in Top Country: <span>3</span></p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;