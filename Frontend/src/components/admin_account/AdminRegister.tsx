import { useState } from 'react';
import '../../styles/Admin/AdminRegister.scss';

const AdminRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(2);

  const handleRegister = async (event: React.FormEvent)=> {
    event.preventDefault();
    console.log('The Register Request: ', { firstName, lastName, email, password, role });
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
          <button type='submit'>Register</button>
        </div>
      </form>
    </div>
  );
}

export default AdminRegister;