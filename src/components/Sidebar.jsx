import React, { useState } from 'react';
import { FaUser, FaCog, FaKey, FaSignOutAlt, FaQuestionCircle, FaTrashAlt } from 'react-icons/fa';
import './css/Sidebar.css';
import ChangePasswordModal from './ChangePasswordModal';
import DeleteAccountModal from './DeleteAccountModal';

const Sidebar = ({ isOpen, onClose, onDeleteAccount }) => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const handleDeleteAccount = () => {
    setShowDeleteAccountModal(true);
  };

  const handleConfirmDelete = () => {
    onDeleteAccount();
    setShowDeleteAccountModal(false);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>&times;</button>
      <div className="sidebar-content">
        <a href="#profile"><FaUser /> Profile</a>
        <a href="#settings"><FaCog /> Settings</a>
        <a href="#" onClick={() => setShowChangePasswordModal(true)}><FaKey /> Change Password</a>
        <a href="#logout"><FaSignOutAlt /> Logout</a>
        <a href="#help"><FaQuestionCircle /> Help/Support</a>
      </div>
      <a href="#" className="delete-account" onClick={handleDeleteAccount}>
        <FaTrashAlt /> Delete Account
      </a>
      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />
      <DeleteAccountModal
        isOpen={showDeleteAccountModal}
        onClose={() => setShowDeleteAccountModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Sidebar;
