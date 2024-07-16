import React from 'react';
import './css/ProfileCard.css';

const ProfileCard = () => {
  return (
    <div className="card profile-card">
      <img src="https://via.placeholder.com/120" alt="User" className="profile-image" />
      <div className="profile-details">
        <h2>User Name</h2>
        <p>Email: <span>user@example.com</span></p>
        <p>Current Level: <span>1</span></p>
        <p>Participating Tasks: <span>4</span></p>
      </div>
    </div>
  );
};

export default ProfileCard;