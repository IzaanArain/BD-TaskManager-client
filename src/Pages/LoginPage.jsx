import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordFill as PasswordIcon } from "react-icons/ri";
import {SlLogin as LoginIcon} from "react-icons/sl"
import { useState } from "react";
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";

const LoginPage = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const [isError,setIsError]=useState("");

  const {setUserAuth}=useAuthContext()
  const navigate=useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserLogin((prev) => ({ ...prev, [name]: value }));
  };

  const login_api = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        { ...data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res_data=await res.data;
      return res_data
    } catch (err) {
      setIsError(err.response.data.message)
      console.error("Error: ", err.response.data.message);
    }
  };

  const loginOnSubmit = (e) => {
    e.preventDefault();
    login_api(userLogin).then((userData)=>{
      localStorage.setItem("user",JSON.stringify(userData.user));
      setUserAuth(userData.user)
    });
  };
  return (
    <>
      <div className="submit_page">
        <div className="submit_form">
          <form onSubmit={loginOnSubmit}>
          <div id="user_logo">
             <LoginIcon/>
            </div>
            <div className="form_heading">
              <p>Login</p>
            </div>
            {isError && (<div id="error_block"><p>{isError}</p></div>)}
            <div className="form-group">
              <label htmlFor="email">
                <TfiEmail />
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={userLogin.email}
                onChange={onChangeHandler}
                placeholder="user email"
                autoComplete="on"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                <PasswordIcon />
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={userLogin.password}
                onChange={onChangeHandler}
                placeholder="user password"
                required
              />
            </div>
            <input type="submit" id="submit_btn" value="SUBMIT" />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
