import React from "react";
import { Navigate } from "react-router";

function AuthWrapper({ children }) {
  //   const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) return children;
  else return <Navigate to={"/signup"} />;
}

export default AuthWrapper;
