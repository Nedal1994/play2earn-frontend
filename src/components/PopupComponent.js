import React, { useState, useEffect, useRef } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './PopupComponent.css'; // Ensure to create this CSS file for styling

const PopupComponent = ({ type, setTotalScore }) => {
    const [currentLevel, setCurrentLevel] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [completedTasks, setCompletedTasks] = useState({
        level1: { Text: false, Audio: false, Image: false },
        level2: { Text: false, Audio: false, Image: false },
        level3: { Text: false, Audio: false, Image: false },
    });
    const [currentSetIndex, setCurrentSetIndex] = useState(0);
    const [textCaptchas, setTextCaptchas] = useState({});
    const [audioCaptchas, setAudioCaptchas] = useState({});
    const [imageCaptchas, setImageCaptchas] = useState({});
    const audioRef = useRef(null);

    const encouragementMessages = [
        'Great job!',
        'Well done!',
        'Awesome!',
        'You nailed it!',
        'Fantastic!',
        'Keep it up!',
        'Excellent!',
        'Perfect!',
    ];

    useEffect(() => {
        const fetchCaptchas = async () => {
            try {
                const textResponse1 = await fetch('http://localhost:5001/api/captcha/text/level1');
                const audioResponse1 = await fetch('http://localhost:5001/api/captcha/audio/level1');
                const imageResponse1 = await fetch('http://localhost:5001/api/captcha/image/level1');
                const textData1 = await textResponse1.json();
                const audioData1 = await audioResponse1.json();
                const imageData1 = await imageResponse1.json();
                setTextCaptchas({ level1: textData1 });
                setAudioCaptchas({ level1: audioData1 });
                setImageCaptchas({ level1: imageData1 });

                const textResponse2 = await fetch('http://localhost:5001/api/captcha/text/level2');
                const audioResponse2 = await fetch('http://localhost:5001/api/captcha/audio/level2');
                const imageResponse2 = await fetch('http://localhost:5001/api/captcha/image/level2');
                const textData2 = await textResponse2.json();
                const audioData2 = await audioResponse2.json();
                const imageData2 = await imageResponse2.json();
                setTextCaptchas(prevState => ({ ...prevState, level2: textData2 }));
                setAudioCaptchas(prevState => ({ ...prevState, level2: audioData2 }));
                setImageCaptchas(prevState => ({ ...prevState, level2: imageData2 }));

                const textResponse3 = await fetch('http://localhost:5001/api/captcha/text/level3');
                const audioResponse3 = await fetch('http://localhost:5001/api/captcha/audio/level3');
                const imageResponse3 = await fetch('http://localhost:5001/api/captcha/image/level3');
                const textData3 = await textResponse3.json();
                const audioData3 = await audioResponse3.json();
                const imageData3 = await imageResponse3.json();
                setTextCaptchas(prevState => ({ ...prevState, level3: textData3 }));
                setAudioCaptchas(prevState => ({ ...prevState, level3: audioData3 }));
                setImageCaptchas(prevState => ({ ...prevState, level3: imageData3 }));

            } catch (error) {
                console.error('Error fetching captchas:', error);
            }
        };

        fetchCaptchas();
    }, []);


    const handleLevelSelection = (level) => {
        setCurrentLevel(level);
        setUserAnswer('');
        setFeedbackMessage('');
        setCurrentSetIndex(0);

        if (!completedTasks[level][type]) {
            setCompletedTasks(prevState => ({
                ...prevState,
                [level]: {
                    ...prevState[level],
                    [type]: false,
                },
            }));
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            const playAudio = async () => {
                try {
                    await audioRef.current.load();
                    await audioRef.current.play();
                } catch (error) {
                    console.error('Error playing audio:', error);
                }
            };
            playAudio();
        }
    }, [currentSetIndex, currentLevel]);

    const handleSubmit = (captcha) => {
        let points = 0;
        if (currentLevel === 'level1') {
            points = 5;
        } else if (currentLevel === 'level2') {
            points = 10;
        } else if (currentLevel === 'level3') {
            points = 15;
        }

        if (type === 'Text') {
            if (userAnswer.toLowerCase() === captcha.answer.toLowerCase()) {
                const randomEncouragement = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
                setFeedbackMessage(`${randomEncouragement} The answer is correct!`);
                setUserAnswer('');
                setTotalScore(prevScore => prevScore + points);
            } else {
                setFeedbackMessage('It is the wrong answer. Try again!');
            }

            if (currentSetIndex < textCaptchas[currentLevel].length - 1) {
                setCurrentSetIndex(currentSetIndex + 1);
            } else {
                setCompletedTasks(prevState => ({
                    ...prevState,
                    [currentLevel]: {
                        ...prevState[currentLevel],
                        [type]: true,
                    },
                }));
                setCurrentLevel(null);
            }
            setUserAnswer('');
        } else if (type === 'Audio') {
            if (userAnswer.toLowerCase() === captcha.answer.toLowerCase()) {
                const randomEncouragement = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
                setFeedbackMessage(`${randomEncouragement} The answer is correct!`);
                setTotalScore(prevScore => prevScore + points);
            } else {
                setFeedbackMessage('It is the wrong answer. Try again!');
            }

            if (currentSetIndex < audioCaptchas[currentLevel].length - 1) {
                setCurrentSetIndex(currentSetIndex + 1);
            } else {
                setCompletedTasks(prevState => ({
                    ...prevState,
                    [currentLevel]: {
                        ...prevState[currentLevel],
                        [type]: true,
                    },
                }));
                setCurrentLevel(null);
            }
            setUserAnswer('');
        } else if (type === 'Image') {
            if (captcha.isCorrect) {
                const randomEncouragement = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
                setFeedbackMessage(`${randomEncouragement} The answer is correct!`);
                setTotalScore(prevScore => prevScore + points);
            } else {
                setFeedbackMessage(`The answer is incorrect. Try the next question!`);
            }

            if (currentSetIndex < imageCaptchas[currentLevel].length - 1) {
                setCurrentSetIndex(currentSetIndex + 1);
            } else {
                setCompletedTasks(prevState => ({
                    ...prevState,
                    [currentLevel]: {
                        ...prevState[currentLevel],
                        [type]: true,
                    },
                }));
                setCurrentLevel(null);
            }
        } else {
            setFeedbackMessage('Incorrect answer. Please try again.');

            if (currentSetIndex < audioCaptchas[currentLevel].length - 1) {
                setCurrentSetIndex(currentSetIndex + 1);
            } else {
                setCompletedTasks(prevState => ({
                    ...prevState,
                    [currentLevel]: {
                        ...prevState[currentLevel],
                        [type]: true,
                    },
                }));
                setCurrentLevel(null);
            }
        }
    };

    const calculateProgress = () => {
        let completedCount = 0;
        let totalCount = 0;

        Object.keys(completedTasks).forEach(level => {
            Object.keys(completedTasks[level]).forEach(taskType => {
                totalCount++;
                if (completedTasks[level][taskType]) {
                    completedCount++;
                }
            });
        });

        return totalCount > 0 ? Math.floor((completedCount / totalCount) * 100) : 0;
    };

    const captchaImages = {
        Text: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Message-icon-blue-symbol-double.png',  // Replace with actual image URL
        Audio: 'audio.png', // Replace with actual image URL
        Image: 'image.png' // Example image URL for Image CAPTCHA
    };

    return (
        <Popup trigger={<button className="button">  <img
            src={captchaImages[type]}
            alt={`${type} CAPTCHA`}
            style={{ width: '110px', height: '100px', marginRight: '8px' }}
        /><br></br> {type.toUpperCase()} CAPTCHA </button>} modal>
            {close => (
                <div className="modal">
                    <button className="close" onClick={() => { close(); setCurrentLevel(null); }}>
                        &times;
                    </button>

                    <div className="content">
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}>
                                Progress: {calculateProgress()}%
                            </div>
                        </div>

                        {!currentLevel && (
                            <>
                                <div className="header" style={{ color: 'black' }}>
                                    CHOOSE YOUR LEVEL OF DIFFICULTY
                                </div>
                                <button onClick={() => handleLevelSelection('level1')} className="level-button1">
                                    EASY
                                </button>
                                <br /><br />
                                <button onClick={() => handleLevelSelection('level2')} className="level-button2">
                                    MEDIUM
                                </button>
                                <br /><br />
                                <button onClick={() => handleLevelSelection('level3')} className="level-button3">
                                    HARD
                                </button>
                            </>
                        )}

                        {currentLevel && type === 'Image' && (
                            <div>
                                {imageCaptchas[currentLevel] && imageCaptchas[currentLevel][currentSetIndex] && (
                                    <>
                                        <p>{imageCaptchas[currentLevel][currentSetIndex].question}</p>
                                        <div className="image-captcha-container">
                                            {imageCaptchas[currentLevel][currentSetIndex].options.map((option, index) => (
                                                <img
                                                    key={index}
                                                    className="captcha-image"
                                                    src={option.imageSrc}
                                                    alt={`CAPTCHA ${index}`}
                                                    onClick={() => handleSubmit(option)}
                                                />
                                            ))}
                                        </div>
                                        <button onClick={() => setCurrentLevel(null)} className="back-button">Back</button>
                                        {feedbackMessage && (
                                            <div className="feedback-message">
                                                {feedbackMessage}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        {currentLevel && type === 'Text' && (
                            <div>
                                {textCaptchas[currentLevel] && textCaptchas[currentLevel][currentSetIndex] && (
                                    <>
                                        <div className="image-captcha-container">
                                            <img
                                                className="captcha-image"
                                                src={textCaptchas[currentLevel][currentSetIndex].url}
                                                alt="CAPTCHA"
                                            />
                                        </div>
                                        <br /><br />
                                        <input
                                            type="text"
                                            placeholder="Your answer here"
                                            value={userAnswer}
                                            onChange={e => setUserAnswer(e.target.value)}
                                        />
                                        <button onClick={() => handleSubmit(textCaptchas[currentLevel][currentSetIndex])} className="submit-button">Submit</button>
                                        <button onClick={() => setCurrentLevel(null)} className="back-button">Back</button>
                                        {feedbackMessage && (
                                            <div className="feedback-message">
                                                {feedbackMessage}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        {currentLevel && type === 'Audio' && (
                            <div>
                                {audioCaptchas[currentLevel] && audioCaptchas[currentLevel][currentSetIndex] && (
                                    <>
                                        <audio id="audioCaptcha" controls ref={audioRef} onLoadedData={() => audioRef.current.play()}>
                                            <source src={audioCaptchas[currentLevel][currentSetIndex].url} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                        <br /><br />
                                        <input
                                            type="text"
                                            placeholder="Your answer here"
                                            value={userAnswer}
                                            onChange={e => setUserAnswer(e.target.value)}
                                        />
                                        <button onClick={() => handleSubmit(audioCaptchas[currentLevel][currentSetIndex])} className="submit-button">
                                            Submit
                                        </button>
                                        <button onClick={() => setCurrentLevel(null)} className="back-button">
                                            Back
                                        </button>
                                        {feedbackMessage && (
                                            <div className="feedback-message">
                                                {feedbackMessage}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="actions">
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default PopupComponent;

