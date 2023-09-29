import React from "react";
import { authContext } from "./AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { json } from "react-router-dom";

const AuthContextProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({});
  // console.log("AuthContext state:",userAuth)
  // const user_d={
  //       name: "jane",
  //       email: "jane@gmail.com",
  //       userAuth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY3MDBlOGI2ZTNhZjBmOTY2ZjQzYzciLCJpYXQiOjE2OTM5Mjc0MTMsImV4cCI6MTY5NDAxMzgxM30.S8U0xmNefAaOTGBXMuSRd-o8yToALdxWz4hBrAZxOEo",
  //       phone: "02220666999",
  //       createdAt: "2023-09-05T10:20:24.551Z",
  //       updatedAt: "2023-09-05T15:23:33.253Z"
  //     }
  // localStorage.setItem("user",JSON.stringify(user_d))
  const auth = JSON.parse(localStorage.getItem("user"));
    const token = auth?.userAuth;
    // console.log("AuthContext token:",token)
  useEffect(() => {
      if(token){
        setUserAuth(auth);
      }
  }, []);
  // console.log("AuthContext:", userAuth);
  return (
    <>
      <authContext.Provider value={{ userAuth, setUserAuth }}>
        {children}
      </authContext.Provider>
    </>
  );
};

export default AuthContextProvider;
