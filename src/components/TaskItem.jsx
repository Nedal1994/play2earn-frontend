import React from 'react';
import './css/TaskItem.css';

const TaskItem = ({ task }) => {
  const handleTaskClick = () => {
    // Implement your logic to start the task here
    console.log(`Starting task: ${task.description}`);
  };

  return (
    <div className="task-item" onClick={handleTaskClick}>
      <div className="task-details">
        <h3>{task.category}</h3>
        <p>{task.description}</p>
        <p>Difficulty: {task.difficulty}</p>
        <p>Reward Points: {task.reward}</p>
      </div>
    </div>
  );
};

export default TaskItem;
