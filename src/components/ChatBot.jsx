import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { IoCloseSharp, IoSend } from "react-icons/io5";
import { PiChatCenteredLight, PiChatCenteredSlashLight } from "react-icons/pi";
import { ThreeDots } from 'react-loader-spinner';
import "./css/chatbot.css";

const options = [
  {
    main: "General Questions",
    sub: ["What is Play2Earn.ai?", "How does Play2Earn.ai work?", "Who can join Play2Earn.ai?"],
  },
  {
    main: "Account & Registration",
    sub: ["How to create an account?", "How to Log in?", "Reset password", "Update my profile"],
  },
  {
    main: "Tasks & Rewards",
    sub: ["What type of tasks are available on Play2Earn.ai", "How do i find and complete tasks?", "How are rewards calculated?", "How to withdraw my earnings?"],
  },
  {
    main: "Technical Support",
    sub: ["I encountered a technical issue", "How to report a bug?", "Is my data secure on Play2Earn.ai"],
  },
  {
    main: "Platform Policies",
    sub: ["what are the rules for using Play2Earn.ai?", "How to contact customer support?", "Can I refer friends to Play2Earn.ai?"],
  },
];

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState([
    { sender: "bot", text: "Welcome to Play2Earn.ai! Feel free to ask me anything, and I will try to answer any questions you might have" }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (question.trim() === "") return;

    const newMessage = { sender: "user", text: question };
    setResponses([...responses, newMessage]);

    const formData = new URLSearchParams();
    formData.append("question", question);

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/chat", formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'text'
      });
      const botMessage = { sender: "bot", text: response.data };
      setResponses((prevResponses) => [...prevResponses, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = { sender: "bot", text: "Sorry, there was an error processing your request. Please try again." };
      setResponses((prevResponses) => [...prevResponses, errorMessage]);
    }

    setIsLoading(false);
    setQuestion("");
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubOptionClick = async (subOption) => {
    const newMessage = { sender: "user", text: subOption };
    setResponses([...responses, newMessage]);

    const formData = new URLSearchParams();
    formData.append("question", subOption);

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/chat", formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'text'
      });
      const botMessage = { sender: "bot", text: response.data };
      setResponses((prevResponses) => [...prevResponses, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = { sender: "bot", text: "Sorry, there was an error processing your request. Please try again." };
      setResponses((prevResponses) => [...prevResponses, errorMessage]);
    }

    setIsLoading(false);
    setSelectedOption(null); // Reset selected option to show main options again
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [responses, isOpen, isMinimized]);

  return (
    <div>
      <div className="chatbot-button" onClick={toggleChat}>
        {isOpen ? <PiChatCenteredSlashLight /> : <PiChatCenteredLight />}
      </div>
      <div className={`chatbot-popup ${isOpen ? "open" : ""} ${isMinimized ? "minimized" : ""}`}>
        <div className="chatbot-header">
          <button onClick={minimizeChat}>
            {isMinimized ? <FiMaximize2 /> : <FiMinimize2 />}
          </button>
          <text>Play2Earn.ai Bot</text>
          <button onClick={toggleChat}><IoCloseSharp /></button>
        </div>
        {!isMinimized && (
          <div className="chatbot-body">
            <div className="chatbot-messages">
              {responses.map((message, index) => (
                <div key={index} className={`chatbot-message ${message.sender}`}>
                  {message.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="chatbot-options">
              {selectedOption === null ? (
                options.map((option, index) => (
                  <button key={index} onClick={() => handleOptionClick(option.main)}>
                    {option.main}
                  </button>
                ))
              ) : (
                options
                  .find((option) => option.main === selectedOption)
                  ?.sub.map((subOption, subIndex) => (
                    <button key={subIndex} onClick={() => handleSubOptionClick(subOption)}>
                      {subOption}
                    </button>
                  ))
              )}
            </div>
            {isLoading && (
              <div className="loading-indicator">
                <ThreeDots width="50" visible={true} color="#147efb" />
              </div>
            )}
            <form onSubmit={handleFormSubmit} className="chatbot-form">
              <input
                type="text"
                value={question}
                onChange={handleInputChange}
                placeholder="Ask me anything..."
                className="chatbot-input"
                disabled={isLoading} // Disabled input
              />
              <button type="submit" className="chatbot-submit" disabled={isLoading}>
                <IoSend />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
