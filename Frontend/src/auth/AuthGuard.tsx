// A guard that authenticates user session before accessing any protected routes.

import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const AuthGuard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

}

export default AuthGuard;

//NOTE:

/**
 * { withCredentials: true } = it is a configuration option provided by the axios library. A configuration option used to include credentials in cross-site requests, ensuring that authentication and session management work correctly
 */