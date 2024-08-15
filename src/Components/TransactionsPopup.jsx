import React from 'react';
import './CSS/TransactionsPopup.css';

const TransactionsPopup = ({ transactions, onClose }) => {
  return (
    <div className="transactions-popup-overlay">
      <div className="transactions-popup">
        <h2>Transaction History</h2>
        <div className="transactions-table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.description}</td>
                  <td>${transaction.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TransactionsPopup;