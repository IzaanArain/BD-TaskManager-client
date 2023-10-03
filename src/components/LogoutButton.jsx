import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";
const LogoutButton = () => {
  const {userAuth,setUserAuth}=useAuthContext()
  const navigate = useNavigate();

 const Logout=()=>{
  setUserAuth(null)
  navigate("/login");
 }
  return (
    <>
      <button onClick={Logout} id="logout_btn">Logout</button>
    </>
  );
};

export default LogoutButton;
