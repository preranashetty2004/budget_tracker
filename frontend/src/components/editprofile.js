import React, { useContext, useState } from 'react';
import './editprofile.css';
import Navbar from './navbar';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditProfile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user.name || '',
    dob: user.dob || '',
    workplace: user.workplace || '',
    occupation: user.occupation || ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Editing profile for user:', user.id);
   axios.put(`http://localhost:5000/api/users/update/${user.id}`, formData)
  .then(() => {
    setUser(prev => ({ ...prev, ...formData }));
    navigate('/profile');
  })
  .catch((err) => {
  console.error('Update error:', err.response?.data || err.message); // 👈 log detailed error
  alert('Failed to update profile.');
});

  };

  return (
    <>
      <Navbar />
      <div className="edit-profile-container">
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} />
          <input type="text" name="workplace" placeholder="Workplace" value={formData.workplace} onChange={handleChange} />
          <input type="text" name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleChange} />
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}

export default EditProfile;
