import React, { useState } from 'react';
import './helpandsupportpage.css';

function App() {
  const [activeTab, setActiveTab] = useState('faq');
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    updates: false
   });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const toggleQuestion = (question) => {
    setActiveQuestion((prevQuestion) => (prevQuestion === question ? null : question));
  };
  const handleInputChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbylmsW65tMkxvCkK2UzV7R_8-MG5-lveLfUyQTLCZk8qVxBizUOiLsSPkBP0URgmCL_/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData).toString()
      });
      console.log('Form submitted successfully');
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: '',
        updates: false
      });
    } catch (error) {
      console.error('There was a problem with form submission:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'faq':
        return (
          <div className="faq-section">
            <h2>General Questions</h2>
            <div className="faq-category">
              <div className="faq-item">
                <button className="faq-question" onClick={() => toggleQuestion('what-is')}>
                  What is Play2Earn.ai?
                  <span className={`arrow ${activeQuestion === 'what-is' ? 'open' : ''}`}>&#9662;</span>
                </button>
                {activeQuestion === 'what-is' && (
                  <div className="faq-answer">
                    Play2Earn.ai is a platform where users can earn cryptocurrency tokens by completing tasks that help train AI models. Our mission is to democratize AI development by making it accessible and rewarding for everyone.
                  </div>
                )}
              </div>
              <div className="faq-item">
                <button className="faq-question" onClick={() => toggleQuestion('how-works')}>
                  How does Play2Earn.ai work?
                  <span className={`arrow ${activeQuestion === 'how-works' ? 'open' : ''}`}>&#9662;</span>
                </button>
                {activeQuestion === 'how-works' && (
                  <div className="faq-answer">
                    Users register on the platform, complete various tasks, and earn cryptocurrency tokens as rewards. These tasks contribute to the training and improvement of AI models.
                  </div>
                )}
              </div>
              <div className="faq-item">
                <button className="faq-question" onClick={() => toggleQuestion('who-can-join')}>
                  Who can join Play2Earn.ai?
                  <span className={`arrow ${activeQuestion === 'who-can-join' ? 'open' : ''}`}>&#9662;</span>
                </button>
                {activeQuestion === 'who-can-join' && (
                  <div className="faq-answer">
                    Anyone can join Play2Earn.ai. We welcome users from all backgrounds who are interested in contributing to AI development and earning rewards.
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="faq-section">
            <h2>Account and Registration</h2>
            <div className="faq-category">
              <div className="faq-item">
                <button className="faq-question" onClick={() => toggleQuestion('create-account')}>
                  How do I create an account?
                  <span className={`arrow ${activeQuestion === 'create-account' ? 'open' : ''}`}>&#9662;</span>
                </button>
                {activeQuestion === 'create-account' && (
                  <div className="faq-answer">
                    Click on the "Register" button on the home page, fill out the registration form with your username, email, and password, and submit the form. You will receive a confirmation email to activate your account.
                  </div>
                )}
              </div>
              <div className="faq-item">
                <button className="faq-question" onClick={() => toggleQuestion('login')}>
                  How do I log in to my account?
                  <span className={`arrow ${activeQuestion === 'login' ? 'open' : ''}`}>&#9662;</span>
                </button>
                {activeQuestion === 'login' && (
                  <div className="faq-answer">
                    Click on the "Login" button, enter your registered email and password, and click "Submit" to access your account.
                  </div>
                )}
              </div>
              <div className="faq-item">
                <button className="faq-question" onClick={() => toggleQuestion('forgot-password')}>
                  What should I do if I forget my password?
                  <span className={`arrow ${activeQuestion === 'forgot-password' ? 'open' : ''}`}>&#9662;</span>
                </button>
                {activeQuestion === 'forgot-password' && (
                  <div className="faq-answer">
                    Click on the "Forgot Password" link on the login page, enter your registered email, and follow the instructions in the email to reset your password.
                  </div>
                )}
              </div>
              <div className="faq-item">
                <button className="faq-question" onClick={() => toggleQuestion('update-profile')}>
                  How do I update my profile information?
                  <span className={`arrow ${activeQuestion === 'update-profile' ? 'open' : ''}`}>&#9662;</span>
                </button>
                {activeQuestion === 'update-profile' && (
                  <div className="faq-answer">
                    Log in to your account, navigate to the "Profile" page, and update your information as needed. Click "Save" to apply the changes.
                  </div>
                )}
              </div>
            </div>
          </div>
);
      case 'tasks':
        return (
          <div className="faq-section">
            <h2>Tasks and Rewards</h2>
            <div className="faq-category">
              <div className="faq-item">
                <button className="faq-question" onClick={() => toggleQuestion('types-of-tasks')}>
                  What types of tasks are available on Play2Earn.ai?
                  <span className={`arrow ${activeQuestion === 'types-of-tasks' ? 'open' : ''}`}>&#9662;</span>
                </button>
                {activeQuestion === 'types-of-tasks' && (
                  <div className="faq-answer">
                    We offer various tasks, including surveys, data duplication detection, CAPTCHA completion, and AI model training feedback.
                  </div>
                )}
              </div>
              <div className="faq-item">

<button className="faq-question" onClick={() => toggleQuestion('complete-tasks')}>
                  How do I find and complete tasks?
                  <span className={`arrow ${activeQuestion === 'complete-tasks' ? 'open' : ''}`}>&#9662;</span>
                </button>
                {activeQuestion === 'complete-tasks' && (
                  <div className="faq-answer">
                    Log in to your account, go to the "Tasks" page, browse the list of available tasks, and click on a task to view its details. Follow the instructions to complete and submit the task.
                  </div>
                )}
              </div>
              <div className="faq-item">
                <button className="faq-question" onClick={() => toggleQuestion('calculate-rewards')}>
                  How are rewards calculated?
                  <span className={`arrow ${activeQuestion === 'calculate-rewards' ? 'open' : ''}`}>&#9662;</span>
                </button>
                {activeQuestion === 'calculate-rewards' && (
                  <div className="faq-answer">
                    Rewards are based on the complexity and difficulty of the task. Each task has a predefined reward amount, which you can view on the task details page.
                  </div>
                )}
              </div>
              <div className="faq-item">
                <button className="faq-question" onClick={() => toggleQuestion('withdraw-earnings')}>
                  How do I withdraw my earnings?
                  <span className={`arrow ${activeQuestion === 'withdraw-earnings' ? 'open' : ''}`}>&#9662;</span>
                </button>
                {activeQuestion === 'withdraw-earnings' && (
                  <div className="faq-answer">
                    Go to the "Rewards" page, check your available balance, and click on the "Withdraw" button. Follow the instructions to transfer your earnings to your cryptocurrency wallet.
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'support':
        return (
          <div className="faq-section">
            <h2>Technical Support</h2>
            <div className="faq-category">
              <div className="faq-item">
                <button className="faq-question" onClick={() => toggleQuestion('technical-issue')}>
                  What should I do if I encounter a technical issue?
                  <span className={`arrow ${activeQuestion === 'technical-issue' ? 'open' : ''}`}>&#9662;</span>
                </button>
                {activeQuestion === 'technical-issue' && (
                  <div className="faq-answer">
                    If you encounter a technical issue, please contact our support team by clicking on the "Contact Us" tab and filling out the form. Provide as much detail as possible about the issue.
                  </div>
                )}
              </div>
              <div className="faq-item">
                <button className="faq-question" onClick={() => toggleQuestion('response-time')}>
                  How long does it take to get a response from support?
                  <span className={`arrow ${activeQuestion === 'response-time' ? 'open' : ''}`}>&#9662;</span>
                </button>
                {activeQuestion === 'response-time' && (
                  <div className="faq-answer">
                    Our support team strives to respond to all inquiries within 24 hours. However, response times may vary depending on the volume of requests.
                  </div>
                )}
              </div>
              <div className="faq-item">
                <button className="faq-question" onClick={() => toggleQuestion('common-solutions')}>
                  Are there any common solutions to frequent issues?
                  <span className={`arrow ${activeQuestion === 'common-solutions' ? 'open' : ''}`}>&#9662;</span>
                </button>
                {activeQuestion === 'common-solutions' && (
                  <div className="faq-answer">
                    Yes, we have a list of common solutions to frequent issues in our Help Center. Please check the Help Center before contacting support.
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        case 'policies':
          return (
            <div className="faq-section">
              <h2>Platform Policies</h2>
              <div className="faq-category">
<div className="faq-item">
                  <button className="faq-question" onClick={() => toggleQuestion('rules')}>
                    What are the rules for using Play2Earn.ai?
                    <span className={`arrow ${activeQuestion === 'rules' ? 'open' : ''}`}>&#9662;</span>
                  </button>
                  {activeQuestion === 'rules' && (
                    <div className="faq-answer">
                      Users must adhere to our terms of service and community guidelines, which prohibit fraudulent activities, spamming, and any form of misconduct. Violating these rules can result in account suspension or termination.
                    </div>
                  )}
                </div>
                <div className="faq-item">
                  <button className="faq-question" onClick={() => toggleQuestion('contact-support')}>
                    How can I contact customer support?
                    <span className={`arrow ${activeQuestion === 'contact-support' ? 'open' : ''}`}>&#9662;</span>
                  </button>
                  {activeQuestion === 'contact-support' && (
                    <div className="faq-answer">
                      You can contact our customer support team by emailing support@play2earn.ai or by filling out the contact form on the "Support" page.
                    </div>
                  )}
                </div>
                <div className="faq-item">
                  <button className="faq-question" onClick={() => toggleQuestion('refer-friends')}>
                    Can I refer friends to Play2Earn.ai?
                    <span className={`arrow ${activeQuestion === 'refer-friends' ? 'open' : ''}`}>&#9662;</span>
                  </button>
                  {activeQuestion === 'refer-friends' && (
                    <div className="faq-answer">
                      Yes, you can refer friends to join Play2Earn.ai. Share your referral link, and when your friends sign up using your link, both you and your friends can earn additional rewards.
                    </div>
                  )}
                </div>
                {/* Add more platform policies questions here */}
              </div>
            </div>
          );
          case 'tutorials':
            return (
              <div className="faq-section">
                <h2>Tutorial Videos and Guides</h2>
                <div className="faq-category">
                  <div className="faq-item">
                    <button className={`test ${activeQuestion === 'tutorial1' ? 'open' : ''}`} onClick={() => toggleQuestion('tutorial1')}>
                      <a href="https://www.youtube.com/watch?v=SUecegkK5GM" target="_blank" rel="noopener noreferrer">How to create an account</a>
                    </button>
                    <br/>
                    <button className={`test ${activeQuestion === 'tutorial2' ? 'open' : ''}`} onClick={() => toggleQuestion('tutorial2')}>
                      <a href="https://www.youtube.com/watch?v=dkGaIVfNYRw" target="_blank" rel="noopener noreferrer">How to complete tasks</a>
                    </button>
                    <br/>
                    <button className={`test ${activeQuestion === 'tutorial3' ? 'open' : ''}`} onClick={() => toggleQuestion('tutorial3')}>
                      <a href="https://www.youtube.com/watch?v=ecaHSVb_6jM" target="_blank" rel="noopener noreferrer">How to withdraw earnings</a>
                    </button>
                    <br/>
                    <button className={`test ${activeQuestion === 'tutorial4' ? 'open' : ''}`} onClick={() => toggleQuestion('tutorial4')}>
                      <a href="https://www.youtube.com/watch?v=4zJ3cvAjRhA" target="_blank" rel="noopener noreferrer">Understanding rewards</a>
                    </button>
                  </div>
                </div>
              </div>
            );  
            case 'contact':
              return (
                <div className="faq-section">
                  <h2>Contact Us</h2>
                  {formSubmitted ? (
                    <div className="form-success-message">
                      Thank you for contacting us! Your message has been sent successfully. We will get back to you soon.
                    </div>
                  ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                      <div className="contact">
                        <div>
                          <label htmlFor="name">Name:</label><br></br>
                          <input className="ip" type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                        </div><br></br>
                        <div>
                          <label htmlFor="email">Email:</label><br></br>
                          <input className="ip" type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                        </div><br></br>
                        <div>
                          <label htmlFor="message">Message:</label><br></br>
                          <textarea id="message" name="message" rows="1" value={formData.message} onChange={handleInputChange} required></textarea>
                        </div><br></br>
                        <div>
                          <input type="checkbox" id="updates" name="updates" checked={formData.updates} onChange={handleInputChange}/>
                          <label htmlFor="updates">  Send me updates about Play2Earn.ai</label>
                        </div><br></br>
                        <center><button type="submit">Submit</button></center>
                      </div>
                    </form>
                  )}
                </div>
              );
      default:
        return null;
    }
  };

  return (
    <div className='body'>
      <h1 className='play'>Play2Earn.ai</h1>
      <div className="app">
        <header>
          <div className='head'>
            <h1> Help and Support Center</h1>
          </div>
          <nav>
            <button className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`} onClick={() => setActiveTab('faq')}>
              General Questions
            </button>
            <button className={`tab-button ${activeTab === 'account' ? 'active' : ''}`} onClick={() => setActiveTab('account')}>
              Account and Registration
            </button>
            <button className={`tab-button ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>
              Tasks and Rewards
            </button>
            <button className={`tab-button ${activeTab === 'support' ? 'active' : ''}`} onClick={() => setActiveTab('support')}>
              Technical Support
            </button>
            <button className={`tab-button ${activeTab === 'policies' ? 'active' : ''}`} onClick={() => setActiveTab('policies')}>
              Platform Policies
            </button>
            <button className={`tab-button ${activeTab === 'tutorials' ? 'active' : ''}`} onClick={() => setActiveTab('tutorials')}>
              Tutorial Videos and Guides
            </button>
            <button className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')}>
              Contact Us
            </button>
          </nav>
        </header>
        <main>
          {renderContent()}
        </main>
        <footer>
          <p>&copy; 2024 Play2Earn.ai. All rights reserved.</p>
          <a href="/report-bug">Report Bug</a>
        </footer>
      </div>
    </div>
  );
}
export default App;
