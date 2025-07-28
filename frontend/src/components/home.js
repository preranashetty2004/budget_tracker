import React from 'react';
import './home.css';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />

      <div className="main-box">
        <h1 className="title">Cashly</h1>
        <div className="button-group">
          <button className="btn" onClick={() => navigate('/expense')}>Expense</button>
           <button className="btn" onClick={() => navigate('/budget')}>Budget</button>
        </div>
        <p className="tagline">"Smarter Spending Starts Here"</p>
      </div>
    </div>
  );
}

export default Home;
