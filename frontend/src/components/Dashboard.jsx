import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Welcome, {user.username}!</h1>
          <div className="header-actions">
            <span className="user-role">Role: {user.role}</span>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-card">
          <h2>Task Management System</h2>
          <p>Welcome to your personal task management dashboard.</p>
          
          <div className="feature-cards">
            <div className="feature-card">
              <h3>Manage Tasks</h3>
              <p>Create, view, update, and delete your tasks</p>
              <Link to="/tasks" className="feature-link">
                Go to Tasks →
              </Link>
            </div>
            
            {user.role === 'admin' && (
              <div className="feature-card admin-feature">
                <h3>Admin Panel</h3>
                <p>Access administrative features and view all users</p>
                <span className="coming-soon">Coming Soon</span>
              </div>
            )}
            
            <div className="feature-card">
              <h3>API Documentation</h3>
              <p>Explore the API endpoints and test them</p>
              <a 
                href="http://localhost:3000/api-docs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="feature-link"
              >
                View Docs →
              </a>
            </div>
          </div>
        </div>

        <div className="user-info">
          <h3>User Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Username:</label>
              <span>{user.username}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <label>Role:</label>
              <span className={`role-badge ${user.role}`}>
                {user.role}
              </span>
            </div>
            <div className="info-item">
              <label>Account Created:</label>
              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;