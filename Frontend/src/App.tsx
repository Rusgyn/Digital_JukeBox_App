import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/admin_account/AdminLogin';
import Dashboard from './components/Dashboard';
import Main from './components/Main';
import AdminRegister from './components/admin_account/AdminRegister'; 
import SearchMusic from './components/jukebox/SearchMusic';
import AuthGuard from './auth/AuthGuard';
import JukeBoxPlaylist from './components/jukebox/JukeBoxPlaylist';
import './styles/App.scss';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* No session required. This Route is public */}
          <Route path="/" element={ <Main />} />
          <Route path="/admin-login" element= { <AdminLogin /> } />
          
          {/* Session Required. Protected Route in one wrapper*/}
          <Route element={<AuthGuard />}>
            <Route path="/dashboard" element={ <Dashboard /> } />
            <Route path='/admin-register' element={ <AdminRegister /> } />
            <Route path='/media-search' element={ <SearchMusic /> } />
            <Route path='/jb-playlist' element={ <JukeBoxPlaylist /> } />
          </Route>
          
        </Routes>
      </div>

    </Router>
  );
};

export default App;