import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Admin/AdminRegister.scss';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(2);

  const handleMainNavigation = () => {
    navigate('/dashboard');
  }

  const handleRegister = async (event: React.FormEvent)=> {
    event.preventDefault();
    console.log('The Register Request: ', { firstName, lastName, email, password, role });

    try {
      const response = await axios.post('/jukeBox/admin-register', 
        {
          firstName,
          lastName,
          email,
          password,
          role
        }
      );//input values

      console.log('Response is: ', response);

      if (response.status === 201) {
        navigate('/admin-login');
      }
    } catch (error:any) {
      console.error('Error occurred while registering: ', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="admin-register">
      <h2>Register here</h2>
      <form onSubmit={handleRegister}>
        <div className="admin-register__form">
          <label htmlFor="first_name">
            First Name:
            <input 
              type='text'
              id='first_name'
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label htmlFor="last_name">
            Last Name:
            <input 
              type='text'
              id='last_name'
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label htmlFor="email">
            Email:
            <input 
              type='email'
              id='email'
              placeholder="email@domain"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password">
            Password:
            <input 
              type='password'
              id='password'
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label htmlFor="role">
            Role:
            <select 
              id='role'
              value={role}
              onChange={(e) => setRole(parseInt(e.target.value))}
              required
            >
              <option value={1}>Super Admin</option>
              <option value={2}>Admin</option>
            </select>
          </label>
          <button 
            className='admin-register__Register'
            type='submit'>Register
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
      <div className='admin-register__dashboard_button'>
        <p onClick={handleMainNavigation}>
        Dashboard
        </p>
      </div>
    </div>
  );
}

export default AdminRegister;