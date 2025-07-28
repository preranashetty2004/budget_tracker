import React, { useState, useEffect, useContext } from 'react';
import './expense.css';
import Navbar from './navbar';
import { BudgetContext } from '../context/BudgetContext';
import axios from 'axios';

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

  const API = 'http://localhost:5000/api/expenses';

  // Fetch expenses from backend on component mount
  useEffect(() => {
    axios.get(API)
      .then(res => setExpenses(res.data))
      .catch(err => console.error('Error fetching expenses:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amount = parseFloat(formData.amount);

    if (editIndex !== null) {
       const expenseToUpdate = expenses[editIndex];

    try {
      await axios.put(`http://localhost:5000/api/expenses/${expenseToUpdate.id}`, formData);
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = { ...formData, id: expenseToUpdate.id }; // include ID
      setExpenses(updatedExpenses);
      setEditIndex(null);
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  } else {
    try {
      const response = await axios.post('http://localhost:5000/api/expenses', formData);
      const newExpense = { ...formData, id: response.data.id };
      setExpenses([...expenses, newExpense]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  }

    setFormData({
      category: '',
      date: '',
      amount: '',
      paymentMode: '',
      description: ''
    });
  };

  const handleDelete = async (index) => {
    const id = expenses[index].id;

    try {
      await axios.delete(`${API}/${id}`);
      setExpenses(expenses.filter((_, i) => i !== index));
      if (editIndex === index) setEditIndex(null);
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  const handleEdit = (index) => {
    setFormData(expenses[index]);
    setEditIndex(index);
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

  const getBudgetForCategory = (category) => {
    const budget = budgets.find(b => b.category === category);
    return budget ? parseFloat(budget.amount) : null;
  };

  const isOverBudget = (expense, index) => {
    const totalSpent = getTotalForCategory(expense.category, index);
    const budget = getBudgetForCategory(expense.category);
    if (budget === null) return false;
    return totalSpent + parseFloat(expense.amount) > budget;
  };

  return (
    <div className="expense-container">
      <Navbar />
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
            const overBudget = isOverBudget(expense, index);

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
