import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/admin_account/AdminLogin';
import Dashboard from './components/Dashboard';
import Main from './components/Main';
import AdminRegister from './components/admin_account/AdminRegister'; 
import SearchMusic from './components/jukeBox/SearchMusic';
import './styles/App.scss';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={ <Main />} />
          <Route path="/dashboard" element={ <Dashboard /> } />
          <Route path="/admin-login" element= { <AdminLogin /> } />
          <Route path='/admin-register' element={ <AdminRegister /> } />
          <Route path='/search-music' element={ <SearchMusic /> } />
        </Routes>
      </div>

    </Router>
  );
}

export default App;