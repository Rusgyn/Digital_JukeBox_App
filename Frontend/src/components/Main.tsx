import { useNavigate } from 'react-router-dom';
import '../styles/Main.scss';

const Main = () => {
  const navigate = useNavigate();
  const handleDashboardNavigation = () => {
    navigate('/dashboard');
  };

  return (
    <div className='main'>
      <h2> This is Main Component </h2>
      <div className='main__content'>
        <button className='main__dashboard_button'
          type='button'
          value="Dashboard"
          onClick={handleDashboardNavigation}>Main</button>
      </div>
    </div>
  )
};

export default Main;