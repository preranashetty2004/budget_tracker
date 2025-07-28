import React, { useState, useContext } from 'react';
import './signin.css';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios'; // ✅ Axios import

function Signin() {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/users/login', {
      email,
      password
    })
    .then((res) => {
      setUser(res.data);      // Set user in context
      navigate('/');
    })
    .catch(() => {
      alert('Invalid email or password');
    });
  };

  return (
    <div>
      <Navbar />
      <div className="signin-container">
        <form className="signin-form" onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <p>Don't have an account? <span onClick={() => navigate('/signup')} className="signup-link">Signup</span></p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
