import React, { useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthData(null);
    navigate("/login");
  };

  useEffect(() => {
    const handleForwardNavigation = (event) => {
      if (event.state && event.state.preventForwardNavigation) {
        navigate("/login");
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handleForwardNavigation);

    return () => {
      window.removeEventListener("popstate", handleForwardNavigation);
    };
  }, [navigate]);

  return (
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
