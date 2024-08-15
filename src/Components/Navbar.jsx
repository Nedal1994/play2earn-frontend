import React, { useState } from 'react';
import './CSS/Navbar.css';
import { FaBell, FaSync, FaUser } from 'react-icons/fa';

const Navbar = ({ onProfileClick }) => {
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showUpdateDropdown, setShowUpdateDropdown] = useState(false);

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    setShowUpdateDropdown(false);
  };

  const toggleUpdateDropdown = () => {
    setShowUpdateDropdown(!showUpdateDropdown);
    setShowNotificationDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="#tasks">Tasks</a>
        <a href="#profile">Profile</a>
      </div>
      <div className="navbar-right">
        <div className="dropdown">
          <button className="icon-btn" onClick={toggleNotificationDropdown}>
            <FaBell />
            <span className="notification-count">3</span>
          </button>
          <div className={`dropdown-content ${showNotificationDropdown ? 'show' : ''}`}>
            <a href="#">New task available</a>
            <a href="#">You've earned 50 points</a>
            <a href="#">Profile updated successfully</a>
            <a href="#" className="view-all">View All Notifications</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="icon-btn" onClick={toggleUpdateDropdown}>
            <FaSync />
          </button>
          <div className={`dropdown-content ${showUpdateDropdown ? 'show' : ''}`}>
            <a href="#">System update: v2.1</a>
            <a href="#">New features added</a>
            <a href="#" className="view-all">View All Updates</a>
          </div>
        </div>
        <button className="profile-btn" onClick={onProfileClick}>
          <FaUser />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;