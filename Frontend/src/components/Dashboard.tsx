import { useNavigate } from "react-router-dom";
import '../styles/Dashboard.scss';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleMainNavigation = () => {
    navigate('/');
  };

  const handleRegisterNavigation = () => {
    navigate('/admin-register');
  };

  // const handleAdminLoginNavigation = () => {
  //   navigate('/admin-login');
  // };

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
        {/* <button 
          className="dashboard__content__admin-login_button"
          type='button'
          value="Admin Login"
          onClick={handleAdminLoginNavigation}>Login</button> */}
      </div>
    </div>
  );
}

export default Dashboard;