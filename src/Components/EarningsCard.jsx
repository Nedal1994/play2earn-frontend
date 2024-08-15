import React, { useState } from 'react';
import axios from 'axios';
import './CSS/EarningsCard.css';
import TransactionsPopup from './TransactionsPopup';

const EarningsCard = ({ earningsData }) => {
  const [showTransactions, setShowTransactions] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleViewTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5001/api/transactions', { withCredentials: true });
      setTransactions(response.data);
      setShowTransactions(true);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Failed to load transactions. Please try again.');
      setLoading(false);
    }
  };

  if (!earningsData) return <div>Loading earnings data...</div>;

  return (
    <>
      <div className="card earnings-card">
        <h3>Earning Overview</h3>
        <div className="balance">
          <h2>$ {earningsData.totalEarned || 0}</h2>
          <p>Total Earned</p>
        </div>
        <div className="stats">
          <div className="stat-item">
            <i className="fas fa-coins"></i>
            <p>Points: <span>{earningsData.points || 0}</span></p>
          </div>
          <div className="stat-item">
            <i className="fas fa-gift"></i>
            <p>Rewards: <span>{earningsData.rewards || 'None'}</span></p>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress" style={{width: '60%'}}></div>
        </div>
        <p className="progress-text">60% to next reward</p>
        <button className="view-transactions" onClick={handleViewTransactions} disabled={loading}>
          {loading ? 'Loading...' : 'View Transactions'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
      {showTransactions && (
        <TransactionsPopup 
          transactions={transactions} 
          onClose={() => setShowTransactions(false)} 
        />
      )}
    </>
  );
};

export default EarningsCard;