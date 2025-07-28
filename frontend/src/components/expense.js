import React, { useState,useContext } from 'react';
import './expense.css';
import Navbar from './navbar';
import { BudgetContext } from '../context/BudgetContext';

function Expense() {
  const [expenses, setExpenses] = useState([]);
  const { budgets } = useContext(BudgetContext);
  const [formData, setFormData] = useState({
    category: '',
    date: '',
    amount: '',
    paymentMode: '',
    description: ''
  });
  const [editIndex, setEditIndex] = useState(null); // for tracking which row is being edited

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Update existing expense
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = formData;
      setExpenses(updatedExpenses);
      setEditIndex(null);
    } else {
      // Add new expense
      setExpenses([...expenses, formData]);
    }

    // Reset form
    setFormData({
      category: '',
      date: '',
      amount: parseFloat(formData.amount),
      paymentMode: '',
      description: ''
    });
  };

  const handleEdit = (index) => {
    setFormData(expenses[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filteredExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(filteredExpenses);
    // Clear form if you're deleting the row being edited
    if (editIndex === index) {
      setFormData({
        category: '',
        date: '',
        amount: '',
        paymentMode: '',
        description: ''
      });
      setEditIndex(null);
    }
  };


  // Sum of all expenses for a given category (excluding the one being edited)
const getTotalForCategory = (category, excludeIndex = null) => {
  return expenses.reduce((total, expense, index) => {
    if (expense.category === category && index !== excludeIndex) {
      return total + parseFloat(expense.amount);
    }
    return total;
  }, 0);
};

// Get budget amount for a given category
const getBudgetForCategory = (category) => {
  const budget = budgets.find(b => b.category === category);
  return budget ? parseFloat(budget.amount) : null;
};

// Check if the current expense causes over budget
const isOverBudget = (expense, index) => {
  const totalSpent = getTotalForCategory(expense.category, index);
  const budget = getBudgetForCategory(expense.category);
  if (budget === null) return false;
  return totalSpent + parseFloat(expense.amount) > budget;
};


  return (
    <div className="expense-container">
      <Navbar/>
      <h2>{editIndex !== null ? 'Update Expense' : 'Add Expense'}</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
        <input type="text" name="paymentMode" placeholder="Payment Mode" value={formData.paymentMode} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <button type="submit">{editIndex !== null ? 'Update' : 'Add'}</button>
      </form>

      <h3>Expense History</h3>
      <table className="expense-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         {expenses.map((expense, index) => {
  const overBudget = isOverBudget(expense, index); // ✅ Check if this row is over budget

  return (
    <tr key={index} className={overBudget ? 'over-budget-row' : ''}>
      <td>{index + 1}</td>
      <td>{expense.category}</td>
      <td>{expense.date}</td>
      <td>{expense.amount}</td>
      <td>{expense.paymentMode}</td>
      <td>{expense.description}</td>
      <td>
        <button className="action-btn edit" onClick={() => handleEdit(index)}>Edit</button>
        <button className="action-btn delete" onClick={() => handleDelete(index)}>Delete</button>
        {overBudget && <div className="alert">⚠ Over Budget</div>}
      </td>
    </tr>
  );
})}

        </tbody>
      </table>
    </div>
  );
}

export default Expense;
