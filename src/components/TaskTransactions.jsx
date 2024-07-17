import React, { useState, useEffect } from 'react';
import './css/TaskTransactions.css';

function TaskTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTransactions, setSelectedTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const transactionsPerPage = 6;

  useEffect(() => {
    // Simulated API call to fetch transactions
    const fetchTransactions = () => {
      const sampleTransactions = [
        { id: 1, user_id: 21, user_name: 'livanson', task_id: 1, interaction_type: 'completed', rating: 1.0, timestamp: '2023-11-09 16:57:21' },
        { id: 2, user_id: 82, user_name: 'alexjohns', task_id: 2, interaction_type: 'viewed', rating: null, timestamp: '2023-09-03 20:24:22' },
        { id: 3, user_id: 1, user_name: 'shela39', task_id: 4, interaction_type: 'viewed', rating: null, timestamp: '2023-09-10 07:00:14' },
        { id: 4, user_id: 53, user_name: 'parkwpatricia', task_id: 1, interaction_type: 'completed', rating: 5.0, timestamp: '2023-08-28 04:09:05' },
        { id: 5, user_id: 37, user_name: 'sanchezraymond', task_id: 1, interaction_type: 'viewed', rating: null, timestamp: '2023-09-20 14:34:38' },
        { id: 6, user_id: 90, user_name: 'ryan08', task_id: 2, interaction_type: 'completed', rating: 3.0, timestamp: '2023-12-14 04:11:44' },
      ];
      setTransactions(sampleTransactions);
    };

    fetchTransactions();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction({ ...transaction });
    setShowEditPopup(true);
  };

  const handleSaveEdit = () => {
    setTransactions(transactions.map(t => t.id === editingTransaction.id ? editingTransaction : t));
    setEditingTransaction(null);
    setShowEditPopup(false);
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
    setShowEditPopup(false);
  };

  const handleDelete = (id) => {
    setDeleteConfirmation(id);
  };

  const confirmDelete = () => {
    setTransactions(transactions.filter(transaction => transaction.id !== deleteConfirmation));
    setDeleteConfirmation(null);
  };

  const handleSelectTransaction = (id) => {
    setSelectedTransactions(prevSelected => 
      prevSelected.includes(id)
        ? prevSelected.filter(transactionId => transactionId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = () => {
    setDeleteConfirmation('selected');
  };

  const confirmDeleteSelected = () => {
    setTransactions(transactions.filter(transaction => !selectedTransactions.includes(transaction.id)));
    setSelectedTransactions([]);
    setDeleteConfirmation(null);
  };

  const filteredTransactions = transactions.filter(transaction =>
    Object.values(transaction).some(value => 
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const pageCount = Math.ceil(filteredTransactions.length / transactionsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="task-transactions">
      <h2>Task Transactions</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      {selectedTransactions.length > 0 && (
        <button className="btn btn-delete-selected" onClick={handleDeleteSelected}>
          Delete Selected ({selectedTransactions.length})
        </button>
      )}
      <div className="table-responsive">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTransactions(currentTransactions.map(transaction => transaction.id));
                    } else {
                      setSelectedTransactions([]);
                    }
                  }}
                  checked={selectedTransactions.length === currentTransactions.length && currentTransactions.length > 0}
                />
              </th>
              <th>Interaction_id</th>
              <th>user_id</th>
              <th>user_name</th>
              <th>task_id</th>
              <th>interaction_type</th>
              <th>rating</th>
              <th>timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedTransactions.includes(transaction.id)}
                    onChange={() => handleSelectTransaction(transaction.id)}
                  />
                </td>
                <td>{transaction.id}</td>
                <td>{transaction.user_id}</td>
                <td>{transaction.user_name}</td>
                <td>{transaction.task_id}</td>
                <td>
                  <span className={`interaction-type ${transaction.interaction_type}`}>
                    {transaction.interaction_type}
                  </span>
                </td>
                <td>{transaction.rating || '-'}</td>
                <td>{transaction.timestamp}</td>
                <td>
                  <button className="btn btn-edit" onClick={() => handleEdit(transaction)}>Edit</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(transaction.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
        {getPageNumbers().map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))} disabled={currentPage === pageCount}>Next</button>
      </div>
      {showEditPopup && (
        <div className="edit-popup">
          <div className="edit-popup-content">
            <h3>Edit Transaction</h3>
            <div className="form-group">
              <label>User ID:</label>
              <input 
                type="number" 
                value={editingTransaction.user_id} 
                onChange={(e) => setEditingTransaction({...editingTransaction, user_id: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>User Name:</label>
              <input 
                type="text" 
                value={editingTransaction.user_name} 
                onChange={(e) => setEditingTransaction({...editingTransaction, user_name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Task ID:</label>
              <input 
                type="number" 
                value={editingTransaction.task_id} 
                onChange={(e) => setEditingTransaction({...editingTransaction, task_id: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Interaction Type:</label>
              <select 
                value={editingTransaction.interaction_type} 
                onChange={(e) => setEditingTransaction({...editingTransaction, interaction_type: e.target.value})}
              >
                <option value="completed">completed</option>
                <option value="viewed">viewed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Rating:</label>
              <input 
                type="number" 
                step="0.1" 
                value={editingTransaction.rating || ''} 
                onChange={(e) => setEditingTransaction({...editingTransaction, rating: e.target.value ? parseFloat(e.target.value) : null})}
              />
            </div>
            <div className="form-group">
              <label>Timestamp:</label>
              <input 
                type="datetime-local" 
                value={editingTransaction.timestamp.slice(0, 16)} 
                onChange={(e) => setEditingTransaction({...editingTransaction, timestamp: e.target.value})}
              />
            </div>
            <div className="edit-popup-actions">
              <button className="btn btn-save" onClick={handleSaveEdit}>Save</button>
              <button className="btn btn-cancel" onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {deleteConfirmation && (
        <div className="delete-confirmation">
          <div className="delete-confirmation-content">
            <p>Are you sure you want to delete {deleteConfirmation === 'selected' ? 'selected transactions' : 'this transaction'}?</p>
            <div className="delete-confirmation-actions">
              <button className="btn btn-confirm" onClick={deleteConfirmation === 'selected' ? confirmDeleteSelected : confirmDelete}>Yes, delete</button>
              <button className="btn btn-cancel" onClick={() => setDeleteConfirmation(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskTransactions;