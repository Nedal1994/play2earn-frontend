// src/Components/SocialAccountsSection.js
import React from 'react';
import './css/SocialAccountsSection.css';

const SocialAccountsSection = () => {
  const socialAccounts = [
    { name: 'X', icon: 'fab fa-twitter' },
    { name: 'Discord', icon: 'fab fa-discord' },
    { name: 'Telegram', icon: 'fab fa-telegram-plane' },
  ];

  return (
    <div className="social-accounts-section">
      <h2>Social Media Accounts</h2>
      <p className="description">
        Link your social media accounts to engage in social offers and earn by liking, following, and interacting with social content.
      </p>
      <div className="social-accounts-list">
        {socialAccounts.map((account) => (
          <div key={account.name} className="social-account-item">
            <div className="account-info">
              <i className={`${account.icon} account-icon`}></i>
              <span className="account-name">{account.name}</span>
            </div>
            <button className="link-button">Link</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialAccountsSection;