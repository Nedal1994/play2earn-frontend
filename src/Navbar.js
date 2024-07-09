import React, { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSync } from '@fortawesome/free-solid-svg-icons';
import ChangePasswordModal from './ChangePasswordModal'; 

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false); 

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="#tasks">Tasks</a>
        <a href="#profile">Profile</a>
      </div>
      <div className="navbar-right">
        <div className="dropdown">
          <button className="dropbtn" onClick={toggleDropdown}>Settings</button>
          {showDropdown && (
            <div className="dropdown-content">
              <a href="#change-password" onClick={openModal}>Change Password</a>
              <a href="#delete-account">Delete Account</a>
            </div>
          )}
        </div>
        <a href="#notifications" className="icon">
          <FontAwesomeIcon icon={faBell} style={{ color: "#ffffff" }} />
        </a>
        <a href="#updates" className="icon">
          <FontAwesomeIcon icon={faSync} style={{ color: "#ffffff" }} />
        </a>
      </div>

      
      <ChangePasswordModal isOpen={showModal} onClose={closeModal} />
    </nav>
  );
};

export default Navbar;
