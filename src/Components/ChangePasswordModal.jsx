import React, { useState } from 'react';
import './CSS/ChangePasswordModal.css';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [passwords, setPasswords] = useState({
    old: '',
    new: '',
    confirm: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwords.old || !passwords.new || !passwords.confirm) {
      setError('Please fill out all fields.');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setError('Passwords do not match.');
      return;
    }
    console.log('Password change logic:', passwords);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}><FaTimes /></button>
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          {['old', 'new', 'confirm'].map((field) => (
            <div className="form-group" key={field}>
              <label htmlFor={`${field}Password`}>
                {field.charAt(0).toUpperCase() + field.slice(1)} Password:
              </label>
              <div className="password-input">
                <input
                  type={showPassword[field] ? "text" : "password"}
                  id={`${field}Password`}
                  name={field}
                  value={passwords[field]}
                  onChange={handleChange}
                />
                <button 
                  type="button" 
                  className="toggle-visibility"
                  onClick={() => togglePasswordVisibility(field)}
                >
                  {showPassword[field] ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          ))}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-btn">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;