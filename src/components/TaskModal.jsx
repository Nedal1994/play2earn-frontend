import React, { useState, useEffect } from 'react';
import './css/TaskModal.css';

const TaskModal = ({ task, onClose, onAccept }) => {
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    // Clear the agreed status for all users when component mounts
    localStorage.removeItem('agreed');
  }, []);

  const handleCheckboxChange = () => {
    setAgreed(!agreed);
    localStorage.setItem('agreed', !agreed);
  };

  if (!task) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{task.category} - Task Details</h2>
        <p>{task.description}</p>
        <p>Difficulty: {task.difficulty}</p>
        <p>Reward Points: {task.reward}</p>
        <p>Instructions: {task.instructions}</p>
        {!agreed && (
          <div className="terms">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="terms">I agree to the terms and services</label>
          </div>
        )}
        <button onClick={onAccept} className="accept-button" disabled={!agreed}>
          Accept Task
        </button>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
