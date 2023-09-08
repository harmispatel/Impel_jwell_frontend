import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const userToken = localStorage.getItem("token");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      return navigate("/login");
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return <>{isLoggedIn ? props.children : null}</>;
};

export default ProtectedRoute;
