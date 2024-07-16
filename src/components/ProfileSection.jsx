// components/ProfileSection.js
import React from 'react';
import ProfileCard from './ProfileCard';
import EarningsCard from './EarningsCard';
import StatsCard from './StatsCard';
import './css/ProfileSection.css';

const ProfileSection = () => {
  return (
    <div className="profile-section">
      <ProfileCard />
      <EarningsCard />
      <StatsCard />
    </div>
  );
};

export default ProfileSection;
