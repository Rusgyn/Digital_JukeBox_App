// A guard that authenticates user session before accessing any protected routes.

import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const AuthGuard = () => { // if export const AuthGuard, => import { AuthGuard}
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('/jukeBox/check-session', {withCredentials: true});
        console.log("Auth Guard response: ", response.data);
        setIsAuthenticated(response.data.loggedIn)
      } catch (error) {
        console.log('Error validating the session: ', error);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };
    checkSession();
  }, []); // [], runs only once

  if (isLoading) {
    console.log('Auth Guard is loading...');
    return null; // This prevent rendering anything until session check completes
  } else {
    console.log('Auth Guard is done...');
    return isAuthenticated ? <Outlet /> : <Navigate to="/admin-login" replace />; // <Outlet /> = react built in component, placeholder for pages that match a route.
  }
  
};

export default AuthGuard; // => import AuthGuard

//NOTE:

/**
 * { withCredentials: true } = it is a configuration option provided by the axios library. A configuration option used to include credentials in cross-site requests, ensuring that authentication and session management work correctly
 * 
 * <Outlet /> = react built in component, placeholder for pages that match a route.
 */