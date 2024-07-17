import React, { useState, useEffect } from 'react';
import './css/TaskManagement.css';

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [taskSearchTerm, setTaskSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    details: '',
    type: '',
    reward: 0,
    image: null,
  });

  useEffect(() => {
    // Simulated API call to fetch tasks
    const fetchTasks = () => {
      const sampleTasks = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        title: `Task ${i + 1}`,
        description: `Description for Task ${i + 1}`,
        details: `Details for Task ${i + 1}`,
        type: ['Matching', 'Solving', 'Choosing'][Math.floor(Math.random() * 3)],
        reward: Math.floor(Math.random() * 200) + 10,
        selected: false,
      }));
      setTasks(sampleTasks);
    };

    fetchTasks();
  }, []);

  const handleNewTaskChange = (e) => {
    const { name, value, type, files } = e.target;
    setNewTask({ 
      ...newTask, 
      [name]: type === 'file' ? files[0] : value 
    });
  };

  const handleAddNewTask = (e) => {
    e.preventDefault();
    const newTaskWithId = {
      ...newTask,
      id: tasks.length + 1,
      reward: parseInt(newTask.reward),
      selected: false,
    };
    setTasks([...tasks, newTaskWithId]);
    setNewTask({
      title: '',
      description: '',
      details: '',
      type: '',
      reward: 0,
      image: null,
    });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id ? { ...editingTask, ...Object.fromEntries(new FormData(e.target)) } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteTask = () => {
    const updatedTasks = tasks.filter((task) => task.id !== taskToDelete);
    setTasks(updatedTasks);
    setShowDeleteConfirmation(false);
    setTaskToDelete(null);
  };

  const handleDeleteSelectedTasks = () => {
    const selectedTasks = tasks.filter((task) => task.selected);
    if (selectedTasks.length > 0) {
      setTaskToDelete('selected');
      setShowDeleteConfirmation(true);
    }
  };

  const confirmDeleteSelectedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.selected);
    setTasks(updatedTasks);
    setShowDeleteConfirmation(false);
    setTaskToDelete(null);
  };

  const handleSelectTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, selected: !task.selected } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(taskSearchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(taskSearchTerm.toLowerCase())
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="task-management">
      <h2>Task Management</h2>
      
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={taskSearchTerm}
          onChange={(e) => setTaskSearchTerm(e.target.value)}
        />
      </div>
      
      <button onClick={handleDeleteSelectedTasks} className="btn btn-danger">Delete Selected</button>
      
      <div className="table-responsive">
        <table className="task-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Task No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Reward</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr key={task.id}>
                <td><input type="checkbox" checked={task.selected} onChange={() => handleSelectTask(task.id)} /></td>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.type}</td>
                <td>{task.reward}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEditTask(task)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        {[...Array(Math.min(5, Math.ceil(filteredTasks.length / tasksPerPage))).keys()].map(number => (
          <button key={number + 1} onClick={() => paginate(number + 1)} className={currentPage === number + 1 ? 'active' : ''}>
            {number + 1}
          </button>
        ))}
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastTask >= filteredTasks.length}>Next</button>
      </div>

      <h3>Add New Task</h3>
      <form onSubmit={handleAddNewTask} className="add-task-form">
        <div className="form-group">
          <input type="text" name="title" placeholder="Task Title" value={newTask.title} onChange={handleNewTaskChange} required />
        </div>
        <div className="form-group">
          <input type="text" name="description" placeholder="Task Description" value={newTask.description} onChange={handleNewTaskChange} required />
        </div>
        <div className="form-group full-width">
          <textarea name="details" placeholder="Task Details" value={newTask.details} onChange={handleNewTaskChange} required />
        </div>
        <div className="form-group">
          <select name="type" value={newTask.type} onChange={handleNewTaskChange} required>
            <option value="">Select Task Type</option>
            <option value="Matching">Matching</option>
            <option value="Solving">Solving</option>
            <option value="Choosing">Choosing</option>
          </select>
        </div>
        <div className="form-group">
          <input type="number" name="reward" placeholder="Task Reward" value={newTask.reward} onChange={handleNewTaskChange} required />
        </div>
        <div className="form-group">
          <div className="upload-image">
            <label htmlFor="task-image">Upload Image</label>
            <input id="task-image" type="file" name="image" onChange={handleNewTaskChange} accept="image/*" />
            <span>{newTask.image ? newTask.image.name : 'No file chosen'}</span>
          </div>
        </div>
        <button type="submit" className="btn btn-success">Add New Task</button>
      </form>

      {editingTask && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Task</h3>
            <form onSubmit={handleUpdateTask}>
              <input type="text" name="title" defaultValue={editingTask.title} required />
              <input type="text" name="description" defaultValue={editingTask.description} required />
              <textarea name="details" defaultValue={editingTask.details} required />
              <select name="type" defaultValue={editingTask.type} required>
                <option value="Matching">Matching</option>
                <option value="Solving">Solving</option>
                <option value="Choosing">Choosing</option>
              </select>
              <input type="number" name="reward" defaultValue={editingTask.reward} required />
              <button type="submit" className="btn btn-primary">Update Task</button>
              <button type="button" className="btn btn-secondary" onClick={() => setEditingTask(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete {taskToDelete === 'selected' ? 'selected tasks' : 'this task'}?</p>
            <button className="btn btn-danger" onClick={taskToDelete === 'selected' ? confirmDeleteSelectedTasks : confirmDeleteTask}>Delete</button>
            <button className="btn btn-secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

function EditTaskModal({ task, onUpdate, onClose }) {
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedTask);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <select
            name="type"
            value={editedTask.type}
            onChange={handleChange}
          >
            <option value="Matching">Matching</option>
            <option value="Solving">Solving</option>
            <option value="Choosing">Choosing</option>
          </select>
          <input
            type="number"
            name="reward"
            value={editedTask.reward}
            onChange={handleChange}
            placeholder="Reward"
          />
          <div className="button-group">
            <button type="submit" className="btn btn-primary">Update</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskManagement;