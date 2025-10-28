import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: ''
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/tasks');
      setTasks(response.data.data.tasks);
    } catch (error) {
      setError('Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingTask) {
        await axios.put(`/tasks/${editingTask._id}`, formData);
      } else {
        await axios.post('/tasks', formData);
      }
      
      resetForm();
      fetchTasks();
    } catch (error) {
      setError('Error saving task');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: ''
    });
    setEditingTask(null);
    setShowForm(false);
  };

  const editTask = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
    });
    setEditingTask(task);
    setShowForm(true);
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await axios.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      setError('Error deleting task');
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'status-pending',
      'in-progress': 'status-in-progress',
      completed: 'status-completed'
    };
    return <span className={`status-badge ${statusClasses[status]}`}>{status}</span>;
  };

  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      low: 'priority-low',
      medium: 'priority-medium',
      high: 'priority-high'
    };
    return <span className={`priority-badge ${priorityClasses[priority]}`}>{priority}</span>;
  };

  return (
    <div className="task-manager">
      <header className="task-header">
        <h1>Task Management</h1>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn-primary"
        >
          {showForm ? 'Cancel' : 'Add New Task'}
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="task-form-card">
          <h3>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Saving...' : (editingTask ? 'Update Task' : 'Create Task')}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="tasks-container">
        {loading && !tasks.length ? (
          <div className="loading">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks found</h3>
            <p>Create your first task to get started!</p>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <div key={task._id} className="task-card">
                <div className="task-header">
                  <h4>{task.title}</h4>
                  <div className="task-actions">
                    <button onClick={() => editTask(task)} className="btn-edit">
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteTask(task._id)} 
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <p className="task-description">{task.description}</p>
                
                <div className="task-meta">
                  <div className="meta-item">
                    <span className="meta-label">Status:</span>
                    {getStatusBadge(task.status)}
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Priority:</span>
                    {getPriorityBadge(task.priority)}
                  </div>
                  {task.dueDate && (
                    <div className="meta-item">
                      <span className="meta-label">Due Date:</span>
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                
                <div className="task-footer">
                  <small>
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;