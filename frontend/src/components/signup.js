import React, { useState } from 'react';
import './signup.css';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ Import axios

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/users/register', formData)
      .then(() => {
        alert('Signup successful! Please login.');
        navigate('/signin');
      })
      .catch((err) => {
  console.error('Signup failed:', err.response?.data || err.message);
  if (err.response?.status === 409) {
    alert('Email already in use.');
  } else if (err.response?.status === 400) {
    alert('Please fill all fields.');
  } else {
    alert('Signup failed. Try again later.');
  }
});

  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit">Register</button>
          <p>Already have an account? <a href="/signin">Signin</a></p>
        </form>
      </div>
    </>
  );
}

export default Signup;
