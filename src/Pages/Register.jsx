
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordFill as PasswordIcon } from "react-icons/ri";
import { FaRegUserCircle as UserLogo } from "react-icons/fa";
import { MdVisibilityOff as VisibilityOff } from "react-icons/md";
import { MdVisibility as VisibilityOn } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [confirmVisibility, setConfirmVisibility] = useState(false);
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();
  const postUser = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/users/create",
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
      throw err.response.data.message
    }
  };

  const CreateUser = (e) => {
    e.preventDefault();
    if (newUser.password === confirmPassword) {
      postUser(newUser).then((res) => {
        const email = res?.data?.email;
        if (email) {
          navigate("/otp_verify", { state: { email: email } });
          setIsError("");
        }
      }).catch((err)=>{
        setIsError(err)
        console.error("Error: ",err);
      });
    } else {
      console.error("Error:", "Password does not match");
      setIsError("Password does not match");
    }
  };

  const OnChangeHandler = (e) => {
    const { value, name } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="submit_page">
        <div className="submit_form">
          <form onSubmit={CreateUser}>
            <div id="user_logo">
              <UserLogo />
            </div>
            <div className="form_heading">
              <hr />
              <p>Register</p>
              <hr />
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
                value={newUser.email}
                onChange={OnChangeHandler}
                placeholder="user email"
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
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
                value={newUser.password}
                onChange={OnChangeHandler}
                placeholder="user password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Must contain at least one  number and one uppercase and lowercase letter, and one special character"
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
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <PasswordIcon />
              </label>
              <input
                type={confirmVisibility ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="confirm password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Must contain at least one  number and one uppercase and lowercase letter, and one special character"
                required
              />
              <button
                className="password-visibility"
                onClick={(e) => {
                  e.preventDefault();
                  setConfirmVisibility(!confirmVisibility);
                }}
              >
                {confirmVisibility ? <VisibilityOff /> : <VisibilityOn />}
              </button>
            </div>
            <input type="submit" id="submit_btn" value="SUBMIT" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
