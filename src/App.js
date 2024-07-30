import React, { useState } from 'react';
import PopupComponent from './components/PopupComponent';
import './App.css';

const App = () => {
    const [totalScore, setTotalScore] = useState(0);

    return (
        <div className="body">
            <div className="captcha-container">
                <h1>Welcome to the CAPTCHA Challenge</h1>
                <p>Test your skills with different types of CAPTCHA tasks. Earn points for correct answers!</p>
                <PopupComponent type="Text" setTotalScore={setTotalScore} />
                <PopupComponent type="Audio" setTotalScore={setTotalScore} />
                <PopupComponent type="Image" setTotalScore={setTotalScore} />
                <div className="final-score">
                    Your Total Score: {totalScore}
                </div>
            </div>
        </div>
    );
};

export default App;
