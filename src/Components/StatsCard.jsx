import React from 'react';
import './CSS/StatsCard.css';

const StatsCard = ({ aiContributionData }) => {
  if (!aiContributionData) return <div>Loading AI contribution data...</div>;

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
              strokeDasharray={`${aiContributionData.taskCompleted || 0}, 100`}
            />
          </svg>
          <div className="stat-number">{aiContributionData.taskCompleted || 0}</div>
          <p>Tasks Completed</p>
        </div>
        <div className="stat-circle">
          <svg viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#1F26F2"
              strokeWidth="2"
              strokeDasharray={aiContributionData.aiModelImproved ? "100, 100" : "0, 100"}
            />
          </svg>
          <div className="stat-number">{aiContributionData.aiModelImproved ? "Yes" : "No"}</div>
          <p>AI Model Improved</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;