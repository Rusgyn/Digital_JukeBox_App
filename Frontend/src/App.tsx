import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/admin_account/AdminLogin';
import Dashboard from './components/Dashboard';
import Main from './components/Main';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={ <Main />} />
          <Route path="/dashboard" element={ <Dashboard /> } />
          <Route path="/admin-login" element= { <AdminLogin /> } />
        </Routes>
      </div>

    </Router>
  );
}

export default App;