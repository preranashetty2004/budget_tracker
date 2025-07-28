import React, { useState,useContext } from 'react';
import './budget.css';
import Navbar from './navbar';
import { BudgetContext } from '../context/BudgetContext';

function Budget() {
   const { budgets, setBudgets } = useContext(BudgetContext);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: ''
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updatedBudgets = [...budgets];
      updatedBudgets[editIndex] = formData;
      setBudgets(updatedBudgets);
      setEditIndex(null);
    } else {
      setBudgets([...budgets, formData]);
    }

    setFormData({ category: '', amount: '', description: '' });
  };

  const handleEdit = (index) => {
    setFormData(budgets[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = budgets.filter((_, i) => i !== index);
    setBudgets(filtered);
    if (editIndex === index) {
      setFormData({ category: '', amount: '', description: '' });
      setEditIndex(null);
    }
  };

  return (
    <div className="budget-container">
    <Navbar/>
      <h2>{editIndex !== null ? 'Update Budget' : 'Add Budget'}</h2>
      <form onSubmit={handleSubmit} className="budget-form">
        <input
          type="text"
          name="category"
          placeholder="Category Name"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Budget"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit">{editIndex !== null ? 'Update' : 'Add'}</button>
      </form>

      <h3>Budget Summary</h3>
      <table className="budget-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Category Name</th>
            <th>Budget</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.category}</td>
              <td>{item.amount}</td>
              <td>{item.description}</td>
              <td>
                <button className="action-btn edit" onClick={() => handleEdit(index)}>Edit</button>
                <button className="action-btn delete" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Budget;
