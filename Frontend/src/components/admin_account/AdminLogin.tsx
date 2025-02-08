/** Admin login page */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Admin/AdminLogin.scss';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Check the session
  useEffect(() => {
    const checkSession = async() => {
      try {
        const response = await axios.get('/jukeBox/check-session', { withCredentials: true }); 

        if (response.data.loggedIn) {
          navigate('/dashboard');
        }

      } catch (error) {
        console.error("Error checking session Frontend: ", error);
      }
    }
    checkSession();
  }, [navigate]);

  const handleMainNavigation = () => {
    navigate('/');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
        
    console.log('The Admin Login Request:', { u: username, p: password });
    
    try {
      const response = await axios.post('/jukeBox/admin-login', 
        {
          username,
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

      <button 
        className="#"
        type='button'
        value="back"
        onClick={() => {navigate(-1)}}> Back {/* Go back prev page */}
      </button>
       
      <button type='button' onClick={handleMainNavigation}>Main</button>

    </div>
  );
}

export default AdminLogin;