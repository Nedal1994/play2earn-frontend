import React from 'react';
import TaskItem from './css/TaskList.css';

const TaskList = ({ tasks }) => {
  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;
