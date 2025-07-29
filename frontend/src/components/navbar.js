import React, { useState, useContext } from 'react';
import './navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation(); // get current route

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const currentPath = location.pathname;

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
          {/* Always show Home button */}
          <button className="sidebar-btn" onClick={() => navigate('/')}>
            Home
          </button>

          {currentPath === '/' && (
            <>
              <button className="sidebar-btn" onClick={() => navigate('/signin')}>
                Sign In
              </button>
              <button className="sidebar-btn" onClick={() => navigate('/profile')}>
                Profile
              </button>
              <button className="sidebar-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}

          {currentPath === '/budget' && (
            <button className="sidebar-btn" onClick={() => navigate('/expense')}>
              Expense
            </button>
          )}

          {currentPath === '/expense' && (
            <button className="sidebar-btn" onClick={() => navigate('/budget')}>
              Budget
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
