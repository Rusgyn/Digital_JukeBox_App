/** Admin login page */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Admin/AdminLogin.scss';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleMainNavigation = () => {
    navigate('/');
  };

  const handleDashboardNavigation = () => {
    navigate('/dashboard');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Example login logic (replace with actual logic)
    if (username === 'admin' && password === 'pass') {
      // Successful login: navigate to dashboard
      navigate('/dashboard');
    } else {
      // Show error if login fails
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="admin-login">
      <h2>This is Admin Login Page!</h2>
      <form onSubmit={handleLogin}>
        <div className='admin-login__form'>
          <label htmlFor='username'>Username:
            <input
              type='text'
              id='username'
              placeholder='username@domain'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor='password'>Password:
            <input
              type='password'
              id='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type='submit'>Login</button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>


      <button type='button' onClick={handleDashboardNavigation}>Dashboard</button>
      <button type='button' onClick={handleMainNavigation}>Main</button>

    </div>
  );
}

export default AdminLogin;