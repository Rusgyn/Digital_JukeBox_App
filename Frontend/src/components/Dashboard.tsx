import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAdminLoginNavigation = () => {
    navigate('/admin-login');
  };

  const handleMainNavigation = () => {
    navigate('/');
  };

  return (
    <div className="dashboard">
      <h2>Welcome to the Dashboard!</h2>
      <button 
        type='button'
        value="Admin Login"
        onClick={handleAdminLoginNavigation}></button>
      <button 
        type='button'
        value="Main"
        onClick={handleMainNavigation}></button>
    </div>
  );
}

export default Dashboard;