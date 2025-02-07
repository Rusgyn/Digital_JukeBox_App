import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Main.scss';

const Main = () => {
  const navigate = useNavigate();
  const [isSession, setIsSession] = useState(false);
  const [data, setData] = useState(''); //Test the backend dev only (TEMP)
  
  const handleLoginNavigation = () => {
    navigate('/admin-login');
  };

  const handleDashboardNavigation = () => {
    navigate('/dashboard');
  };

  const handleAdminLogoutNavigation = async() => {
    try {
      console.log('Sending logout request...');
      const response = await axios.post('/admin-logout', {}, {withCredentials: true}); // {} the request body, which is empty in this case. Without "withCredentials: true", the browser will not include cookies, and the backend won’t recognize the session.
      
      if (response.status === 200) {
        navigate('/admin-login');
      }

    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  useEffect(() => {
    // Test the backend connection, during dev only (TEMP)
    axios.get('/jukeBox')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data: ', error)); 
  }, []);

   // Check the session
   useEffect(() => {
    const checkSession = async() => {
      try {
        const response = await axios.get('/jukeBox/check-session', { withCredentials: true }); 

        setIsSession(response.data.loggedIn); //true

      } catch (error) {
        console.error("Error checking session Frontend: ", error);
      }
    }
    checkSession();
  }, []);

  return (
    <div className='main'>
      <h2> This is Main Component </h2><br/>
      <p> Backend Test | API response: {data} </p>
      {isSession ? (
        <div className='main__content'>
          <button 
            className="main__dashboard_login"
            type='button'
            value="logout"
            onClick={handleDashboardNavigation}>Dashboard</button>
          <button 
            className="main__dashboard_login"
            type='button'
            value="logout"
            onClick={handleAdminLogoutNavigation}>Logout</button>
        </div>
      ) : ( // !isSession
        <div className='main__content'>
          <button className='main__dashboard_login'
          type='button'
          value="login"
          onClick={handleLoginNavigation}>Login</button> 
        </div>
      ) }
    </div>
  )
};

export default Main;