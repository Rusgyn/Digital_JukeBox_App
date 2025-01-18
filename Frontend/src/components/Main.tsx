import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const handleDashboardNavigation = () => {
    navigate('/dashboard');
  };

  return (
    <div className='main'>
      <h2> This is Main Component </h2>
      <button className='main__dashboard-button'
        type='button'
        value="Dashboard"
        onClick={handleDashboardNavigation}></button>
    </div>
  )
};

export default Main;