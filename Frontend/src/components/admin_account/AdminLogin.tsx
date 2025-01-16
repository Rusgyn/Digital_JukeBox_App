/** Admin login page */
import { useState} from 'react';
import '../../styles/Admin/AdminLogin.scss';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      alert('Welcome Admin!');
    } else {
      alert('Invalid Username or Password');
    }
  };

  return (
    <div className="admin-login">
      This is Admin Login Page!
      <form onSubmit={handleLogin}>
        <div className='admin-login__Form'>
          <label htmlFor='username'>Username:
            <input
              type='username'
              id='username'
              placeholder='username@domain'
              value={username}
              onChange={(event) => {setUsername(event.target.value)}}>
            </input>
          </label>

          <label htmlFor='password'>Password:
            <input
              type='password'
              id='password'
              placeholder='password'
              value={password}
              onChange={(event)=> setPassword(event.target.value)}
              required >
            </input>
          </label>

          <input 
            className='admin-login__Login'
            type='submit'
            value='Click to Login'></input>
        </div>
      </form>
      
      
    </div>
  );
}

export default AdminLogin;