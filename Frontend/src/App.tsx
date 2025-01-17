import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/admin_account/AdminLogin';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={ <AdminLogin />} />
          <Route path="/dashboard" element={ <Dashboard /> } />
        </Routes>
      </div>

    </Router>
  );
}

export default App;