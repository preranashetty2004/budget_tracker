import React, { useContext } from 'react';
import './profile.css';
import Navbar from './navbar';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

function Profile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // ✅ Initialize navigate

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <h2>👤 User Profile</h2>
          {user ? (
            <div>
              <p><strong>Name:</strong> {user.name || 'Not set'}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Date of Birth:</strong> {user.dob || 'Not set'}</p>
              <p><strong>Workplace:</strong> {user.workplace || 'Not set'}</p>
              <p><strong>Occupation:</strong> {user.occupation || 'Not set'}</p>
              <button className="edit-btn" onClick={() => navigate('/edit-profile')}>
                Edit Profile
              </button>
            </div>
          ) : (
            <p>No user is logged in.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
