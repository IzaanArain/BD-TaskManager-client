import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";
const LogoutButton = () => {
  const {userAuth,setUserAuth}=useAuthContext()
  const navigate = useNavigate();

 const Logout=()=>{
  // const user = JSON.parse(localStorage.getItem("user"));
  // delete user.userAuth;
 localStorage.setItem("user", JSON.stringify({}));
 const logoutState=localStorage.getItem("user")
  setUserAuth(logoutState)
  navigate("/login");
 }



  return (
    <>
      <button onClick={Logout} id="logout_btn">Logout</button>
    </>
  );
};

export default LogoutButton;
