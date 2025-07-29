import React, { useState, useEffect, useContext } from 'react';
import './budget.css';
import Navbar from './navbar';
import { BudgetContext } from '../context/BudgetContext';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function Budget() {
  const { budgets, setBudgets } = useContext(BudgetContext);
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const API = 'http://localhost:5000/api/budgets';

 useEffect(() => {
  if (user && user.id) {
    axios.get(`http://localhost:5000/api/budgets/${user.id}`)
      .then(res => setBudgets(res.data))
      .catch(err => console.error('Fetch error:', err));
  }
}, [user, setBudgets]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (editIndex !== null) {
    const id = budgets[editIndex].id;
    try {
      await axios.put(`${API}/${id}`, formData);
      const updated = [...budgets];
      updated[editIndex] = { ...formData, id };
      setBudgets(updated);
      setEditIndex(null);
    } catch (err) {
      console.error('Update failed:', err);
    }
  } else {
    try {
      const res = await axios.post(API, {
        ...formData,
        user_id: user.id // ✅ send user_id
      });
      setBudgets([...budgets, { ...formData, id: res.data.id }]);
    } catch (err) {
      console.error('Add failed:', err);
    }
  }

  setFormData({ category: '', amount: '', description: '' });
};


  const handleEdit = (index) => {
    setFormData(budgets[index]);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const id = budgets[index].id;
    try {
      await axios.delete(`${API}/${id}`);
      const updated = budgets.filter((_, i) => i !== index);
      setBudgets(updated);
      if (editIndex === index) {
        setFormData({ category: '', amount: '', description: '' });
        setEditIndex(null);
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="budget-container">
      <Navbar />
      <h2>{editIndex !== null ? 'Update Budget' : 'Add Budget'}</h2>
      <form onSubmit={handleSubmit} className="budget-form">
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <button type="submit">{editIndex !== null ? 'Update' : 'Add'}</button>
      </form>

      <h3>Budget Summary</h3>
      <table className="budget-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((item, index) => (
            <tr key={item.id}>
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
