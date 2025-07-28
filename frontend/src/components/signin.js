import React, { useState, useContext } from 'react';
import './signin.css';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Signin() {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate successful login
    const loggedInUser = {
  email,
  password,
  name: '',
  dob: '',
  workplace: '',
  occupation: ''
};
setUser(loggedInUser);
     // Set profile in context

    navigate('/');             // Redirect to Home
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
