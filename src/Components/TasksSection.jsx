// src/components/TasksSection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/TasksSection.css';

const ChallengeCard = ({ category, title, points, isParticipating, onParticipate }) => {
  return (
    <div className="challenge-card">
      <div className="challenge-image"></div>
      <div className="challenge-info">
        <p className="challenge-category">{category}</p>
        <h3 className="challenge-title">{title}</h3>
        <div className="challenge-footer">
          <span className="challenge-points">₿{points}</span>
          <button className="challenge-button" onClick={onParticipate}>
            {isParticipating ? 'Continue' : 'Participate'}
          </button>
        </div>
      </div>
    </div>
  );
};

const TasksSection = () => {
  const [recommendedTasks, setRecommendedTasks] = useState([]);
  const [participatingTasks, setParticipatingTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const [recommendationsResponse, participatingResponse] = await Promise.all([
          axios.get('http://localhost:5001/api/recommendations'),
          axios.get('http://localhost:5001/api/tasks/participating')
        ]);
        setRecommendedTasks(recommendationsResponse.data);
        setParticipatingTasks(participatingResponse.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleParticipate = async (taskId) => {
    try {
      await axios.post(`http://localhost:5001/api/tasks/${taskId}/participate`);
      // Refresh tasks after participation
      const participatingResponse = await axios.get('http://localhost:5001/api/tasks/participating');
      setParticipatingTasks(participatingResponse.data);
    } catch (error) {
      console.error('Error participating in task:', error);
    }
  };

  return (
    <div className="tasks-section">
      <h2>Task Rewards</h2>
      <section className="challenges-section">
        <h3>Recommended Tasks</h3>
        <div className="challenges-list">
          {recommendedTasks.map(task => (
            <ChallengeCard 
              key={task._id} 
              {...task} 
              isParticipating={false} 
              onParticipate={() => handleParticipate(task._id)}
            />
          ))}
        </div>
      </section>
      <section className="challenges-section">
        <h3>Participating Challenges</h3>
        <div className="challenges-list">
          {participatingTasks.map(task => (
            <ChallengeCard 
              key={task._id} 
              {...task} 
              isParticipating={true}
              onParticipate={() => handleParticipate(task._id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TasksSection;