import React, { useState } from 'react';
// import TaskList from './components/TaskList';
import TaskFilters from './TaskFilters';
import SearchBar from './SearchBar';
// import TaskModal from './components/TaskModal';
import './css/EarnPage.css'
import TaskModal from './TaskModal';

const categoryLogos = {
  'Quick': 'https://img.icons8.com/?size=100&id=9g4b4vZ8G7zQ&format=png&color=000000',
  'Watch & Profit': 'https://img.icons8.com/?size=100&id=jUQ6RCUtTWab&format=png&color=000000',
  'Featured': 'https://img.icons8.com/?size=100&id=114494&format=png&color=000000',
  'X': 'https://img.icons8.com/?size=100&id=yoQabS8l0qpr&format=png&color=000000',
  'Social': 'https://img.icons8.com/?size=100&id=Wr2FqAb3M8nX&format=png&color=000000',
  'HG Achievements': 'https://img.icons8.com/?size=100&id=MR491bFjG6en&format=png&color=000000',
  'Telegram': 'https://img.icons8.com/?size=100&id=63306&format=png&color=000000',
  'Discord': 'https://img.icons8.com/?size=100&id=CtBPALjW5AFQ&format=png&color=000000',
};



const EarnPage = () => {
  
  
  const [tasks, setTasks] = useState([
    { id: 1, category: 'Quick', description: 'Annotate images with bounding boxes.', difficulty: 'Easy', reward: 10, logo: categoryLogos['Quick'], instructions: 'Use the provided tool to draw bounding boxes around objects in the images. Ensure accuracy and consistency across all annotations.' },
    { id: 2, category: 'Watch & Profit', description: 'Validate the accuracy of data entries.', difficulty: 'Medium', reward: 20, logo: categoryLogos['Watch & Profit'], instructions: 'Review the data entries provided and compare them to the original source. Correct any inaccuracies and report any discrepancies found.' },
    { id: 3, category: 'Featured', description: 'Review product descriptions for accuracy.', difficulty: 'Easy', reward: 15, logo: categoryLogos['Featured'], instructions: 'Read the product descriptions and ensure they match the product specifications. Correct any errors or inconsistencies found in the descriptions.' },
    { id: 4, category: 'X', description: 'Transcribe audio recordings.', difficulty: 'Hard', reward: 50, logo: categoryLogos['X'], instructions: 'Listen to the provided audio recordings and transcribe them accurately. Ensure proper spelling, punctuation, and grammar in the transcription.' },
    { id: 5, category: 'Social', description: 'Engage with social media posts.', difficulty: 'Medium', reward: 20, logo: categoryLogos['Social'], instructions: 'Like, comment, and share the provided social media posts. Ensure your engagements are positive and adhere to the community guidelines.' },
    { id: 6, category: 'HG Achievements', description: 'Test new software features.', difficulty: 'Hard', reward: 40, logo: categoryLogos['HG Achievements'], instructions: 'Use the provided software and test the new features. Report any bugs or issues found and provide feedback on the usability and functionality of the features.' },
    { id: 7, category: 'Telegram', description: 'Moderate chat groups.', difficulty: 'Easy', reward: 10, logo: categoryLogos['Telegram'], instructions: 'Monitor the chat groups and ensure all participants adhere to the group rules. Address any inappropriate behavior or content and report any serious issues to the group admin.' },
    { id: 8, category: 'Discord', description: 'Create engaging content.', difficulty: 'Medium', reward: 25, logo: categoryLogos['Discord'], instructions: 'Create and share engaging content in the provided Discord server. Ensure the content is relevant to the server’s theme and adheres to the community guidelines.' },
    { id: 9, category: 'Quick', description: 'Tag images with keywords.', difficulty: 'Easy', reward: 10, logo: categoryLogos['Quick'], instructions: 'Analyze the images and tag them with appropriate keywords. Ensure the tags are relevant and cover all significant aspects of the images.' },
    { id: 10, category: 'Watch & Profit', description: 'Analyze survey results.', difficulty: 'Medium', reward: 20, logo: categoryLogos['Watch & Profit'], instructions: 'Review the survey results and analyze the data to identify trends and insights. Provide a summary of your findings in a concise report.' },
    { id: 11, category: 'Featured', description: 'Proofread articles.', difficulty: 'Easy', reward: 15, logo: categoryLogos['Featured'], instructions: 'Read the provided articles and check for any spelling, grammar, or punctuation errors. Correct any mistakes and ensure the articles are well-written and coherent.' },
    { id: 12, category: 'X', description: 'Translate documents.', difficulty: 'Hard', reward: 50, logo: categoryLogos['X'], instructions: 'Translate the provided documents from the source language to the target language. Ensure the translation is accurate and maintains the original meaning and tone.' },
    { id: 13, category: 'Social', description: 'Manage social media accounts.', difficulty: 'Medium', reward: 20, logo: categoryLogos['Social'], instructions: 'Post content, respond to comments and messages, and engage with followers on the provided social media accounts. Ensure all interactions are positive and adhere to the account guidelines.' },
    { id: 14, category: 'HG Achievements', description: 'Perform software testing.', difficulty: 'Hard', reward: 40, logo: categoryLogos['HG Achievements'], instructions: 'Use the provided software and perform thorough testing to identify any bugs or issues. Document your findings and provide detailed feedback on the software’s performance and usability.' },
    { id: 15, category: 'Telegram', description: 'Create chat bots.', difficulty: 'Easy', reward: 10, logo: categoryLogos['Telegram'], instructions: 'Use the provided tools and instructions to create and set up chat bots for the Telegram platform. Ensure the bots are functional and meet the specified requirements.' },
    { id: 16, category: 'Discord', description: 'Organize online events.', difficulty: 'Medium', reward: 25, logo: categoryLogos['Discord'], instructions: 'Plan and organize online events for the provided Discord server. Coordinate with participants and ensure the events run smoothly and adhere to the server’s guidelines.' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTask, setSelectedTask] = useState(null);

  const filteredTasks = tasks.filter(task => {
    return (
      (selectedCategory === 'All' || task.category === selectedCategory) &&
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const handleAcceptTask = () => {
    console.log(`Task ${selectedTask.id} accepted`);
    setSelectedTask(null);
  };


  return (
    <div className="app-container">
      <h1>Task Marketplace</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TaskFilters selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <div className="task-columns">
        {filteredTasks.map(task => (
          <div key={task.id} className="task-container" onClick={() => handleTaskClick(task)}>
            <img src={task.logo} alt={`${task.category} logo`} className="task-logo" />
            <div className="task-content">
              <h3>{task.category}</h3>
              <p>{task.description}</p>
              <p>Difficulty: {task.difficulty}</p>
              <p>Reward Points: {task.reward}</p>
            </div>
          </div>
        ))}
      </div>
      <TaskModal task={selectedTask} onClose={handleCloseModal} onAccept={handleAcceptTask} />
    </div>
  );
};

export default EarnPage;
