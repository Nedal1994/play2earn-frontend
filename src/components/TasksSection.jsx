// src/Components/TasksSection.js
import React from 'react';
import TasksBoard from './TasksBoard';
import './css/TasksSection.css';

const TasksSection = () => {
  return (
    <div className="tasks-section">
      <h2>Task Rewards</h2>
      <TasksBoard />
    </div>
  );
};

export default TasksSection;