// context/BudgetContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const API = 'http://localhost:5000/api/budgets';

  // Fetch budgets from backend when app loads
  useEffect(() => {
    axios.get(API)
      .then(res => setBudgets(res.data))
      .catch(err => console.error('Error loading budgets:', err));
  }, []);

  return (
    <BudgetContext.Provider value={{ budgets, setBudgets }}>
      {children}
    </BudgetContext.Provider>
  );
};
