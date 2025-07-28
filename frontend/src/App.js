import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './components/signup';
import Signin from './components/signin';
import Home from './components/home';
import Expense from './components/expense';
import Budget from './components/budget';
import Profile from './components/profile';
import EditProfile from './components/editprofile';

import { UserContext } from './context/UserContext';
import { BudgetProvider } from './context/BudgetContext';

function App() {
  const [user, setUser] = useState(null); // Store logged-in user

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BudgetProvider>
        <Router>
          <div className="App">
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/budget" element={<Budget />} />
            </Routes>
          </div>
        </Router>
      </BudgetProvider>
    </UserContext.Provider>
  );
}

export default App;
