// hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useCheckSession = () => {
  const navigate = useNavigate();
  const [isSessionChecked, setIsSessionChecked] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("/jukeBox/check-session", { withCredentials: true });

        if (!response.data.loggedIn) {
          navigate("/admin-login", { replace: true });
          return;
        }
      } catch (error) {
        console.error("Error checking session (Frontend):", error);
        navigate("/admin-login", { replace: true });
        return;
      }
      setIsSessionChecked(true); // Mark session as checked
    };

    checkSession();
  }, [navigate]);

  return isSessionChecked; // Components can use this state if needed
}

export default useCheckSession;

//NOTE:

/**
 * { withCredentials: true } = it is a configuration option provided by the axios library. A configuration option used to include credentials in cross-site requests, ensuring that authentication and session management work correctly
 */