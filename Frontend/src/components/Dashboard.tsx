import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Dashboard.scss';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleMainNavigation = () => {
    navigate('/');
  };

  const handleRegisterNavigation = () => {
    navigate('/admin-register');
  };

  const handleAdminLogoutNavigation = async() => {
    try {
      console.log('Sending logout request...');
      const response = await axios.post('/admin-logout', {}, {withCredentials: true}); // {} the request body, which is empty in this case. Without "withCredentials: true", the browser will not include cookies, and the backend won’t recognize the session.
      console.log('Logout response:', response);
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging out: ', error);
    }
    
  }

  return (
    <div className="dashboard">
      <h2>Welcome to the Dashboard!</h2>
      <p>Click on the buttons below to navigate to different pages.</p>

      <div className="dashboard__content">
        <button
          className="dashboard__content__main_button"
          type='button'
          value="Main"
          onClick={handleMainNavigation}>Main</button>
        <button
          className="dashboard__content__register_button"
          type='button'
          value="register"
          onClick={handleRegisterNavigation}>Add new account</button>
        <button 
          className="dashboard__content__admin-logout_button"
          type='button'
          value="logout"
          onClick={handleAdminLogoutNavigation}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;