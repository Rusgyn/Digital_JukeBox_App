import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Main.scss';

const Main = () => {
  const navigate = useNavigate();
  const [data, setData] = useState('');

  const handleDashboardNavigation = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    // Test the backend connection
    axios.get('/jukeBox')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data: ', error)); 
  }, []);

  return (
    <div className='main'>
      <h2> This is Main Component </h2><br/>
      <p> Backend Test | API response: {data} </p>
      <div className='main__content'>
        <button className='main__dashboard_button'
          type='button'
          value="Dashboard"
          onClick={handleDashboardNavigation}>Dashboard</button>
      </div>
    </div>
  )
};

export default Main;