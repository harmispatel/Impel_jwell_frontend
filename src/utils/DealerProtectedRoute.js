import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DealerProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userToken = localStorage.getItem("token");

  const checkDealer = () => {
    if (!userToken) {
      setIsLoggedIn(false);
      return navigate("/login");
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkDealer();
  }, [isLoggedIn]);

  return <>{isLoggedIn ? props.children : null}</>;
};

export default DealerProtectedRoute;
