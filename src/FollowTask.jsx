import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaTwitter, FaLinkedin, FaTelegram, FaYoutube, FaUpload, FaInstagram, FaTiktok } from 'react-icons/fa';
import ShareAchievement from './ShareAchievement';
import './FollowTask.css';

const FollowTask = () => {
  const [tasks, setTasks] = useState({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [notification, setNotification] = useState(null);
  const [userId, setUserId] = useState(null);
  const [verificationPopup, setVerificationPopup] = useState(null);
  const [completedTaskId, setCompletedTaskId] = useState(null);

  useEffect(() => {
    const randomUserId = Math.random().toString(36).substring(7);
    setUserId(randomUserId);
    fetchTasks();
    fetchUserData(randomUserId);
  }, []);

  useEffect(() => {
    if (!verificationPopup) {
      setCompletedTaskId(null);
    }
  }, [verificationPopup]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/follow-tasks');
      const groupedTasks = response.data.reduce((acc, task) => {
        if (!acc[task.platform]) {
          acc[task.platform] = [];
        }
        acc[task.platform].push({
          ...task,
          icon: getIconForPlatform(task.platform),
          completed: false,
          shared: false,
          completedAt: null,
          screenshotUrl: null,
          expanded: false
        });
        return acc;
      }, {});
      setTasks(groupedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const getIconForPlatform = (platform) => {
    switch (platform.toLowerCase()) {
      case 'twitter': return FaTwitter;
      case 'linkedin': return FaLinkedin;
      case 'telegram': return FaTelegram;
      case 'youtube': return FaYoutube;
      case 'instagram': return FaInstagram;
      case 'tiktok': return FaTiktok;
      default: return FaTwitter;
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/user/${userId}`);
      setTasks(prevTasks => {
        const updatedTasks = { ...prevTasks };
        Object.keys(updatedTasks).forEach(platform => {
          updatedTasks[platform] = updatedTasks[platform].map(task => {
            const userTask = response.data.tasks[platform.toLowerCase()]?.find(t => t.accountLink === task.accountLink);
            return {
              ...task,
              completed: userTask?.completed || false,
              shared: userTask?.shared || false,
              screenshotUrl: userTask?.screenshotUrl || null,
              completedAt: userTask?.completedAt || null
            };
          });
        });
        return updatedTasks;
      });
      setTotalPoints(response.data.totalPoints);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const extractAccountName = (account) => {
    if (account.includes('linkedin.com')) {
      // Try to extract a meaningful name from LinkedIn URLs
      const parts = account.split('/');
      let name = '';
      for (let i = parts.length - 1; i >= 0; i--) {
        if (parts[i] && !parts[i].includes('linkedin.com')) {
          name = parts[i];
          break;
        }
      }
      // If we found a name, format it; otherwise, return the full URL
      if (name) {
        name = name.split('?')[0]; // Remove query parameters
        return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      } else {
        return account; // Return full URL if we couldn't extract a name
      }
    }
    // For other platforms, keep the existing logic
    let name = account.replace(/^@/, '');
    const parts = name.split('/');
    return parts[parts.length - 1];
  };
  
  const handleFollow = (platform, account) => {
    let url;
    
    if (platform === 'LinkedIn') {
      url = account; // Use the full URL for LinkedIn
    } else {
      const accountName = extractAccountName(account);
      
      switch (platform) {
        case 'Twitter':
          url = `https://twitter.com/${accountName}`;
          break;
        case 'Telegram':
          url = `https://t.me/${accountName}`;
          break;
        case 'YouTube':
          url = `https://www.youtube.com/${accountName}`;
          break;
        case 'Instagram':
          url = `https://www.instagram.com/${accountName}`;
          break;
        case 'TikTok':
          url = `https://www.tiktok.com/@${accountName}`;
          break;
        default:
          return;
      }
    }
    
    window.open(url, '_blank');
  };

  const handleScreenshotUpload = useCallback(async (platform, accountLink, file) => {
    if (!file || !userId) return;

    const formData = new FormData();
    formData.append('screenshot', file);
    formData.append('platform', platform);
    formData.append('userId', userId);
    formData.append('accountLink', accountLink);

    try {
      const response = await axios.post('http://localhost:3001/upload-screenshot', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      if (response.data.success) {
        setTasks(prevTasks => {
          const updatedTasks = { ...prevTasks };
          updatedTasks[platform] = updatedTasks[platform].map(task => {
            if (task.accountLink === accountLink) {
              return {
                ...task,
                completed: true,
                completedAt: new Date(),
                screenshotUrl: response.data.screenshotUrl,
                expanded: true
              };
            }
            return task;
          });
          return updatedTasks;
        });
        setTotalPoints(response.data.totalPoints);
        showNotification(`Screenshot uploaded successfully for ${platform} (${accountLink}).`, 'success');
        setVerificationPopup({
          message: `Your task for ${platform} (${accountLink}) has been submitted. You will be rewarded points after verification in 5-7 days.`,
          platform: platform,
          accountLink: accountLink,
          sharePrompt: `Share your achievement now!`
        });
      } else {
        showNotification(`Task for ${platform} (${accountLink}) already completed.`, 'info');
      }
    } catch (error) {
      console.error(`Error uploading screenshot for ${platform} (${accountLink}):`, error);
      showNotification(`Error uploading screenshot for ${platform} (${accountLink}). Please try again.`, 'error');
    }
  }, [userId]);

  const handleFileUpload = (platform, accountLink, event) => {
    const file = event.target.files[0];
    if (file) {
      handleScreenshotUpload(platform, accountLink, file);
    }
  };

  const handlePaste = useCallback((platform, accountLink, event) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        handleScreenshotUpload(platform, accountLink, blob);
        break;
      }
    }
  }, [handleScreenshotUpload]);

  useEffect(() => {
    const pasteListener = (event) => {
      if (event.target.tagName === 'INPUT' && event.target.type === 'file') {
        const platform = event.target.getAttribute('data-platform');
        const accountLink = event.target.getAttribute('data-account-link');
        handlePaste(platform, accountLink, event);
      }
    };

    window.addEventListener('paste', pasteListener);

    return () => {
      window.removeEventListener('paste', pasteListener);
    };
  }, [handlePaste]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleShareAchievement = (platform, accountLink, socialPlatform) => {
    showNotification(`Sharing ${platform} (${accountLink}) achievement on ${socialPlatform}...`, 'info');
    
    setTimeout(async () => {
      try {
        const response = await axios.post('http://localhost:3001/share-achievement', {
          userId,
          platform,
          accountLink,
          socialPlatform
        });
        
        if (response.data.success) {
          setTasks(prevTasks => {
            const updatedTasks = { ...prevTasks };
            updatedTasks[platform] = updatedTasks[platform].map(task => {
              if (task.accountLink === accountLink) {
                return {
                  ...task,
                  shared: true
                };
              }
              return task;
            });
            return updatedTasks;
          });
          setTotalPoints(response.data.totalPoints);
          showNotification(`Shared ${platform} (${accountLink}) achievement on ${socialPlatform}! Earned ${response.data.sharePoints} points.`, 'success');
        }
      } catch (error) {
        console.error('Error sharing achievement:', error);
        showNotification(`Error sharing achievement. Please try again.`, 'error');
      }
    }, 10000);
  };

  const toggleExpand = (platform, taskId) => {
    setTasks(prevTasks => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[platform] = updatedTasks[platform].map(task => ({
        ...task,
        expanded: task._id === taskId ? !task.expanded : task.expanded
      }));
      return updatedTasks;
    });
  };

  return (
    <div className="follow-task-container">
      <h2>Follow Tasks</h2>
      <div className="total-points">Total Points: {totalPoints}</div>
      {Object.entries(tasks).map(([platform, platformTasks]) => (
        <div key={platform} className="platform-group">
          <h3>{platform}</h3>
          <div className="task-list">
            {platformTasks.map((task) => (
              <div key={`${task._id}-${task.accountLink}`} className={`task-item ${task.completed ? 'completed' : ''} ${task.expanded ? 'expanded' : ''}`}>
                <div className="task-header" onClick={() => toggleExpand(platform, task._id)}>
                  <div className="task-info">
                    <span className={`platform-icon ${platform.toLowerCase()}`}><task.icon /></span>
                    <span className="account-name">{platform === 'LinkedIn' ? (extractAccountName(task.accountLink) === task.accountLink ? 'LinkedIn Profile' : extractAccountName(task.accountLink)): `@${extractAccountName(task.accountLink)}`} </span>
                  </div>
                  <div className="task-actions">
                    <span className="task-points">{task.reward} points</span>
                    {!task.completed && (
                      <>
                        <button className="follow-button" onClick={(e) => { e.stopPropagation(); handleFollow(platform, task.accountLink); }}>
                          Follow
                        </button>
                        <label className="upload-button">
                          <FaUpload /> Upload Screenshot
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(platform, task.accountLink, e)}
                            data-platform={platform}
                            data-account-link={task.accountLink}
                          />
                        </label>
                      </>
                    )}
                    {task.completed && <span className="completed-text">Completed</span>}
                  </div>
                </div>
                {task.expanded && (
                  <div className="task-details">
                    <div className="completed-info">
                      {task.completedAt && (
                        <span className="completed-date">Completed on: {new Date(task.completedAt).toLocaleString()}</span>
                      )}
                      {task.screenshotUrl && (
                        <a href={task.screenshotUrl} target="_blank" rel="noopener noreferrer" className="view-screenshot">View Screenshot</a>
                      )}
                      <ShareAchievement 
                        platform={platform} 
                        accountLink={task.accountLink}
                        userId={userId} 
                        onShare={handleShareAchievement} 
                      />
                      {task.shared && (
                        <span className="shared-text">Achievement shared</span>
                      )}
                    </div>
                  </div>
                )}
                {completedTaskId === task._id && verificationPopup && (
                  <div className="verification-popup">
                    <button className="close-button" onClick={() => setVerificationPopup(null)}>×</button>
                    <h3>Task Submitted!</h3>
                    <p>{verificationPopup.message}</p>
                    <p className="share-prompt">{verificationPopup.sharePrompt}</p>
                    <ShareAchievement 
                      platform={verificationPopup.platform} 
                      accountLink={verificationPopup.accountLink}
                      userId={userId} 
                      onShare={handleShareAchievement} 
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      {verificationPopup && (
        <div className="popup-overlay" onClick={() => setVerificationPopup(null)}>
          <div className="verification-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setVerificationPopup(null)}>×</button>
            <h3>Task Submitted!</h3>
            <p>{verificationPopup.message}</p>
            <p className="share-prompt">{verificationPopup.sharePrompt}</p>
            <ShareAchievement 
              platform={verificationPopup.platform} 
              accountLink={verificationPopup.accountLink}
              userId={userId} 
              onShare={handleShareAchievement} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowTask;
