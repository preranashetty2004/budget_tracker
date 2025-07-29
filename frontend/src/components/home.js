import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { BudgetContext } from '../context/BudgetContext';

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { budgets } = useContext(BudgetContext);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const totalBudget = budgets.reduce((sum, item) => sum + parseFloat(item.amount), 0);

  useEffect(() => {
    if (user && user.id) {
      axios.get(`http://localhost:5000/api/expenses/${user.id}`)
        .then(res => {
          const total = res.data.reduce((sum, item) => sum + parseFloat(item.amount), 0);
          setTotalExpenses(total);
        })
        .catch(err => console.error("Expense fetch failed", err));
    }
  }, [user]);

  const remaining = (user?.salary || 0) - totalExpenses;

  return (
    <div className="home-container">
      <Navbar />

      {/* Top Banner */}
      <div className="main-box">
        <h1 className="title">Cashly</h1>
        <div className="button-group">
          <button className="btn" onClick={() => navigate('/expense')}>Expense</button>
          <button className="btn" onClick={() => navigate('/budget')}>Budget</button>
        </div>
        <p className="tagline">"Smarter Spending Starts Here"</p>
      </div>

      {/* Financial Summary */}
      <div className="home-summary">
        <h2>💼 Financial Overview</h2>
        <p><strong>Salary:</strong> ₹{user?.salary || 0}</p>
        {/* <p><strong>Total Budgets:</strong> ₹{totalBudget.toFixed(2)}</p> */}
        <p><strong>Total Expenses:</strong> ₹{totalExpenses.toFixed(2)}</p>
        <p><strong>Remaining Balance:</strong> ₹{remaining.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Home;
