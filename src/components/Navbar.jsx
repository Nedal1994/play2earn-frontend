import React, { useState } from 'react';
import './css/Navbar.css';
import ChangePasswordModal from './ChangePasswordModal';
import notificationIcon from '../assets/notificationIcon.png'; 
import updateIcon from '../assets/updateIcon.png';

const Navbar = ({ onProfileClick }) => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showUpdateDropdown, setShowUpdateDropdown] = useState(false);

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  const toggleUpdateDropdown = () => {
    setShowUpdateDropdown(!showUpdateDropdown);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="#tasks">Tasks</a>
        <a href="#profile">Profile</a>
      </div>
      <div className="navbar-right">
        <div className="notification-dropdown">
          <button className="icon-btn notification-btn" onClick={toggleNotificationDropdown}>
            <img src={notificationIcon} alt="Notification" className="icon-image" />
            <span className="notification-count">3</span>
          </button>
          <div className={`dropdown-content ${showNotificationDropdown ? 'show' : ''}`}>
            <a href="#">Notification 1</a>
            <a href="#">Notification 2</a>
            <a href="#">Notification 3</a>
            <a href="#">View All</a>
          </div>
        </div>
        <div className="update-dropdown">
          <button className="icon-btn update-btn" onClick={toggleUpdateDropdown}>
            <img src={updateIcon} alt="Update" className="icon-image" />
          </button>
          <div className={`dropdown-content ${showUpdateDropdown ? 'show' : ''}`}>
            <a href="#">Update 1</a>
            <a href="#">Update 2</a>
          </div>
        </div>
        <button className="profile-btn" onClick={onProfileClick}>
          <img src="https://via.placeholder.com/40" alt="Profile" className="profile-image" />
        </button>
      </div>
      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />
    </nav>
  );
};

export default Navbar;