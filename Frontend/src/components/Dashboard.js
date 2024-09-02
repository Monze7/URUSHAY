// src/components/Dashboard.js
import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload'); // Default to Upload tab

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/dashboard/${tab}`);
  };

  const handleLogout = () => {
    navigate('/'); // Redirect to login on logout
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <button
          className={`nav-button ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => handleTabChange('upload')}
        >
          Upload from System
        </button>
        <button
          className={`nav-button ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => handleTabChange('saved')}
        >
          Saved Documents
        </button>
        <button className="nav-button logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className="dashboard-content">
        <Outlet /> {/* Renders the selected component */}
      </div>
    </div>
  );
};

export default Dashboard;
