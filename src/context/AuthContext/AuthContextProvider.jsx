import React from "react";
import { authContext } from "./AuthContext";
import { useState } from "react";
import { useEffect } from "react";

const AuthContextProvider = ({ children }) => {
 const initialState=()=>{
  const userLocalStorage=JSON.parse(localStorage.getItem("user"))
  return userLocalStorage ? userLocalStorage : null
 };
  const [userAuth, setUserAuth] = useState(initialState);
  //Updating the state during the Mounting phase
  // useEffect(() => {
  //   const data=JSON.parse(localStorage.getItem("user"));
  //   if(data!==null){
  //     setUserAuth((prev)=>({...prev,...data}))
  //   }
  // },[]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userAuth));
  }, [userAuth]);

  return (
    <>
      <authContext.Provider value={{ userAuth, setUserAuth }}>
        {children}
      </authContext.Provider>
    </>
  );
};

export default AuthContextProvider;
