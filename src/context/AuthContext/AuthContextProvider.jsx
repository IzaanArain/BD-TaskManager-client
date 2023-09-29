import React from "react";
import { authContext } from "./AuthContext";
import { useState } from "react";
import { useEffect } from "react";

const AuthContextProvider = ({ children }) => {
  const userLocalStorage=JSON.parse(localStorage.getItem("user"))
  const [userAuth, setUserAuth] = useState(userLocalStorage);

  // useEffect(()=>{
  //   const data=JSON.parse(localStorage.getItem("user"));
  //   if(data){
  //     setUserAuth(data)
  //   }
  // },[]);


useEffect(()=>{
  localStorage.setItem("user",JSON.stringify(userAuth));
},[userAuth]);

  return (
    <>
      <authContext.Provider value={{ userAuth, setUserAuth }}>
        {children}
      </authContext.Provider>
    </>
  );
};

export default AuthContextProvider;
