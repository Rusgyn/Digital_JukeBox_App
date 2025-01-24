/** Admin login page */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Admin/AdminLogin.scss';
import axios from 'axios';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleMainNavigation = () => {
    navigate('/');
  };

  // const handleDashboardNavigation = () => {
  //   navigate('/dashboard');
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
   
    console.log('The Login Request:', { email: username, password });

    try {
      const response = await axios.post('/jukeBox/admin-login', 
        {
          email: username,
          password
        } 
      );

      console.log("Response is: ", response);

      if (response.status === 200) {
        navigate('/dashboard');
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred. Please try again.');
      }
    }

  };

  return (
    <div className="admin-login">
      <h2>This is Admin Login Page!</h2>
      <form onSubmit={handleLogin}>
        <div className='admin-login__form'>
          <label htmlFor='username'>
            Username:
            <input
              type='text'
              id='username'
              placeholder='username@domain'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor='password'>
            Password:
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
{/* 
      <button type='button' onClick={handleDashboardNavigation}>Dashboard</button> */}
      
      <button type='button' onClick={handleMainNavigation}>Main</button>

    </div>
  );
}

export default AdminLogin;