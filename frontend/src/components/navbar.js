import React, { useState } from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="left-section">
          <div className="logo">🌀</div>
          <div className="app-name">Cashly</div>
        </div>
        <div className="right-section">
          <button className="profile-btn" onClick={toggleSidebar}>☰</button>
        </div>
      </nav>

      {isSidebarOpen && (
        <div className="sidebar">
          <button className="sidebar-btn" onClick={() => navigate('/signin')}>
            Sign In
          </button>
          <button className="sidebar-btn" onClick={() => navigate('/profile')}>
            Profile
          </button>
          {/* You can add more links here */}
        </div>
      )}
    </>
  );
}

export default Navbar;

