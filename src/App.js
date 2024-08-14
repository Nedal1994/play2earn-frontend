import React, { useState, useEffect } from 'react';
import './App.css';
import AudioPlayer from './components/AudioPlayer';
import Feedback from './components/Feedback';
import spellingVariations from './components/spellingVariations';
import { FaHeart, FaGem } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAllTasks } from './services/apiService';
import audiopic from './assets/audiopic.jpg'; // Correct import

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [transcription, setTranscription] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isError, setIsError] = useState(false);
  const [points, setPoints] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchAllTasks();
        console.log('Fetched Tasks:', fetchedTasks);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const normalizeText = (text) => {
    if (!text) {
      console.error('Invalid input to normalizeText:', text);
      return '';
    }
    let normalizedText = text.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_~()]/g, "").trim();
    Object.keys(spellingVariations).forEach(ukSpelling => {
      const usSpelling = spellingVariations[ukSpelling];
      const regex = new RegExp(ukSpelling, 'g');
      normalizedText = normalizedText.replace(regex, usSpelling);
    });
    return normalizedText;
  };

  const handleSubmit = () => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    const currentTask = tasks[currentTaskIndex];
    if (!currentTask || !transcription.trim()) {
      console.error('Invalid task or transcription:', currentTask, transcription);
      setIsSubmitting(false);
      return;
    }

    if (normalizeText(transcription) === normalizeText(currentTask.transcription)) {
      setFeedback("Correct!");
      setIsError(false);
      setPoints(points + currentTask.points);  // Use the points from the current task
      setTranscription("");
      setLives(Math.min(lives + 1, 3));
      toast.success(`Great job! You got it right! You earned ${currentTask.points} points!`, { autoClose: 3000 });
      if (currentTaskIndex < tasks.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
      } else {
        setFeedback("Congratulations! You've completed all levels!");
        toast.success("Congratulations! You've completed all levels!", { autoClose: 3000 });
        setGameStarted(false);
        setShowCongrats(true);
      }
    } else {
      setFeedback("Try again!");
      setIsError(true);
      setLives(lives - 1);
      toast.error("Oops! That's not quite right. Try again!", { autoClose: 3000 });
      if (lives - 1 === 0) {
        setFeedback("You've lost all your lives! Try again tomorrow.");
      }
    }

    setIsSubmitting(false);
  };

  const handleCongratsClose = () => {
    setShowCongrats(false);
    resetGame();
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentTaskIndex(0);
    setPoints(0);
    setLives(3);
    setFeedback("");
    setTranscription("");
  };

  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < lives; i++) {
      hearts.push(<FaHeart key={i} className="heart full" />);
    }
    for (let i = lives; i < 3; i++) {
      hearts.push(<FaHeart key={i} className="heart empty" />);
    }
    return hearts;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div>
        {/* Show Congrats Popup if all levels are completed */}
        {showCongrats ? (
            <div className="congrats-popup">
              <h1>Congratulations!</h1>
              <p>You've completed all levels!</p>
              <button onClick={handleCongratsClose}>Close</button>
            </div>
        ) : (
            <div
                className={`App ${gameStarted ? "expanded" : "initial"}`}
                style={{
                  backgroundImage: `url(${audiopic})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
            >
              <h1>{gameStarted ? `Level ${tasks[currentTaskIndex]?.difficulty_level}` : 'Audio Transcription Task'}</h1>
              <hr />
              {!gameStarted ? (
                  <button className="start-button" onClick={() => setGameStarted(true)}>Start</button>
              ) : (
                  <>
                    {lives > 0 ? (
                        <>
                          <AudioPlayer src={tasks[currentTaskIndex]?.audio_url} />
                          <textarea value={transcription} onChange={(e) => setTranscription(e.target.value)} />
                          <button className="submit-button" onClick={handleSubmit}>Submit</button>
                        </>
                    ) : null}
                    <Feedback message={feedback} isError={isError} />
                    <div className="points-lives">
                      <p><FaGem /> Points: {points}</p>
                      <p>Lives: {renderHearts()}</p>
                    </div>
                  </>
              )}
              <ToastContainer />
            </div>
        )}
      </div>
  );
};

export default App;
