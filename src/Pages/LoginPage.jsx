import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordFill as PasswordIcon } from "react-icons/ri";
import { SlLogin as LoginIcon } from "react-icons/sl";
import { MdVisibilityOff as VisibilityOff } from "react-icons/md";
import { MdVisibility as VisibilityOn } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";

const LoginPage = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState("");
  const [visibility, setVisibility] = useState(false);
  const { userAuth, setUserAuth } = useAuthContext();
  const token = userAuth?.userAuth;
  const navigate = useNavigate();

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
      const res_data = await res.data;
      return res_data;
    } catch (err) {
      throw err.response.data.message;
    }
  };

  const loginOnSubmit = (e) => {
    e.preventDefault();
    login_api(userLogin)
      .then((userData) => {
        setUserAuth(userData.user);
        navigate("/assigned_task")
      })
      .catch((err) => {
        setIsError(err);
        console.error("Error: ", err);
      })
  };

  const getVerified = (e) => {
    e.preventDefault();
    navigate("/otp_verify", { state: { email: userLogin.email } });
  };
  return (
    <>
      <div className="submit_page">
        <div className="submit_form">
          <form onSubmit={loginOnSubmit}>
            <div id="user_logo">
              <LoginIcon />
            </div>
            <div className="form_heading">
              <p>Login</p>
            </div>
            {isError && (
              <div id="error_block">
                <p>{isError}</p>
              </div>
            )}
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
                type={visibility ? "text" : "password"}
                name="password"
                id="password"
                value={userLogin.password}
                onChange={onChangeHandler}
                placeholder="user password"
                required
              />
               <button
                className="password-visibility"
                onClick={(e) => {
                  e.preventDefault();
                  setVisibility(!visibility);
                }}
              >
                {visibility ? <VisibilityOff /> : <VisibilityOn />}
              </button>
            </div>
            <Link to="/forgot_password" id="forgot_link">Forgot Password ?</Link>
            {isError === "user is not verified" ? (
              <button id="verify_btn" onClick={getVerified}>
                GET VERIFIED
              </button>
            ) : null}
            <input type="submit" id="submit_btn" value="LOGIN" />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
