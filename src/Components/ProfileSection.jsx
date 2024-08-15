import React from 'react';
import './CSS/ProfileSection.css';
import ProfileCard from './ProfileCard';
import EarningsCard from './EarningsCard';
import StatsCard from './StatsCard';

const ProfileSection = ({ userData, earningsData, aiContributionData }) => {
  if (!userData || !earningsData || !aiContributionData) {
    return <div>Loading profile data...</div>;
  }

  return (
    <div className="profile-section">
      <ProfileCard userData={userData} />
      <EarningsCard earningsData={earningsData} />
      <StatsCard aiContributionData={aiContributionData} />
    </div>
  );
};

export default ProfileSection;