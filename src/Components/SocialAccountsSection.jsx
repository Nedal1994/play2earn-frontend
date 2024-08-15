import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';
import './CSS/SocialAccountsSection.css';

const SocialAccountsSection = () => {
  const [socialAccounts, setSocialAccounts] = useState([]);

  useEffect(() => {
    fetchSocialAccounts();
  }, []);

  const fetchSocialAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/social-accounts');
      setSocialAccounts(response.data);
    } catch (error) {
      console.error('Error fetching social accounts:', error);
    }
  };

  const linkAccount = (platform) => {
    const width = 600;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const authWindow = window.open(
      `http://localhost:5001/api/social-accounts/${platform}`,
      `${platform}Auth`,
      `width=${width},height=${height},left=${left},top=${top}`
    );

    const checkAuth = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(checkAuth);
        fetchSocialAccounts();
      }
    }, 1000);
  };

  const unlinkAccount = async (platform) => {
    try {
      await axios.post('http://localhost:5001/api/social-accounts/unlink', { platform });
      fetchSocialAccounts();
    } catch (error) {
      console.error('Error unlinking account:', error);
    }
  };

  const getIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return FaTwitter;
      case 'linkedin':
        return FaLinkedin;
      default:
        return null;
    }
  };

  return (
    <div className="social-accounts-section">
      <h2>Social Media Accounts</h2>
      <p className="description">
        Link your social media accounts to engage in social offers and earn by liking, following, and interacting with social content.
      </p>
      <div className="social-accounts-list">
        {['Twitter', 'LinkedIn'].map((platform) => {
          const account = socialAccounts.find(acc => acc.platform.toLowerCase() === platform.toLowerCase());
          const Icon = getIcon(platform);
          return (
            <div key={platform} className="social-account-item">
              <div className="account-info">
                {Icon && <Icon className="account-icon" />}
                <span className="account-name">{platform}</span>
              </div>
              <button 
                className="link-button" 
                onClick={() => account ? unlinkAccount(platform.toLowerCase()) : linkAccount(platform.toLowerCase())}
              >
                {account ? 'Unlink' : 'Link'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialAccountsSection;