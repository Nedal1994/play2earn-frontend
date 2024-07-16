import React, { useState } from 'react';
import './css/TasksBoard.css';

const ChallengeCard = ({ category, title, points, isParticipating }) => {
  return (
    <div className="challenge-card">
      <div className="challenge-image"></div>
      <div className="challenge-info">
        <p className="challenge-category">{category}</p>
        <h3 className="challenge-title">{title}</h3>
        <p className="challenge-description"></p>
        <div className="challenge-footer">
          <span className="challenge-points">₿{points}</span>
          <button className="challenge-button">{isParticipating ? 'Continue' : 'Participate'}</button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const allGameTasks = [
    { id: 1, category: 'Category 1', title: 'Title 1', points: 500 },
    { id: 2, category: 'Category 2', title: 'Title 2', points: 500 },
    { id: 3, category: 'Category 3', title: 'Title 3', points: 500 },
    { id: 4, category: 'Category 4', title: 'Title 4', points: 500 },
  ];

  const allParticipatingChallenges = [
    { id: 1, category: 'Category 1', title: 'Title 1', points: 500, isParticipating: true },
    { id: 2, category: 'Category 2', title: 'Title 2', points: 500, isParticipating: true },
    { id: 3, category: 'Category 3', title: 'Title 3', points: 500, isParticipating: true },
    { id: 4, category: 'Category 4', title: 'Title 4', points: 500, isParticipating: true },
  ];

  const [visibleGameTasks, setVisibleGameTasks] = useState(2);
  const [visibleParticipatingChallenges, setVisibleParticipatingChallenges] = useState(2);

  const loadMoreGameTasks = () => {
    setVisibleGameTasks(prev => prev + 2);
  };

  const loadMoreParticipatingChallenges = () => {
    setVisibleParticipatingChallenges(prev => prev + 2);
  };

  return (
    <div className="App">
      <section className="challenges-section">
        <h2>Game Tasks Challenges</h2>
        <div className="challenges-list">
          {allGameTasks.slice(0, visibleGameTasks).map(task => (
            <ChallengeCard key={task.id} category={task.category} title={task.title} points={task.points} />
          ))}
        </div>
        {visibleGameTasks < allGameTasks.length && (
          <button onClick={loadMoreGameTasks} className="see-more">+ See More</button>
        )}
      </section>

      <section className="challenges-section">
        <h2>Participating Challenges</h2>
        <div className="challenges-list">
          {allParticipatingChallenges.slice(0, visibleParticipatingChallenges).map(task => (
            <ChallengeCard key={task.id} category={task.category} title={task.title} points={task.points} isParticipating={task.isParticipating} />
          ))}
        </div>
        {visibleParticipatingChallenges < allParticipatingChallenges.length && (
          <button onClick={loadMoreParticipatingChallenges} className="see-more">+ See More</button>
        )}
      </section>
    </div>
  );
};

export default App;
