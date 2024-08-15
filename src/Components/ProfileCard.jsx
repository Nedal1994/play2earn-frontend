import React from 'react';
import './CSS/ProfileCard.css';

const ProfileCard = ({ userData }) => {
  if (!userData) return <div>Loading...</div>;

  return (
    <div className="card profile-card">
      <img src="https://via.placeholder.com/120" alt="User" className="profile-image" />
      <div className="profile-details">
        <h2>{userData.username}</h2>
        <p>Email: <span>{userData.email || 'N/A'}</span></p>
        <p>Current Level: <span>{userData.currentLevel || 'N/A'}</span></p>
        <p>Participating Tasks: <span>{userData.participatingTask || 'N/A'}</span></p>
      </div>
    </div>
  );
};

export default ProfileCard;