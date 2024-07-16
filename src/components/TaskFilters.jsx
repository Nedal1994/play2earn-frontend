import React from 'react';
import './css/TaskFilters.css';

const TaskFilters = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ['All', 'Quick', 'Watch & Profit', 'Featured', 'X', 'Social', 'HG Achievements', 'Telegram', 'Discord'];

  return (
    <div className="task-filters">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;
