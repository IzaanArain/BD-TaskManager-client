import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordFill as PasswordIcon } from "react-icons/ri";
import { MdVisibilityOff as VisibilityOff } from "react-icons/md";
import { MdVisibility as VisibilityOn } from "react-icons/md";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [confirmVisibility, setConfirmVisibility] = useState(false);
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email ? location?.state?.email : "";
console.log("reset",email)
  const resetPasswordApi = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/users/reset_password",
        { email, password }
      );
      const res_data = await res.data;
      return res_data;
    } catch (err) {
      throw err.response.data.message;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
   if(password===confirmPassword){
    resetPasswordApi(email, password)
    .then(() => {
      navigate("/login");
    })
    .catch((err) => {
      setIsError(err);
    });
   }else{
    setIsError("password does not match")
   }
  };
  return (
    <>
      <div className="submit_page">
        <div className="submit_form">
          <form onSubmit={onSubmit}>
            <div className="form_heading">
              <hr />
              <p>Forgot Password</p>
              <hr />
              <p>Enter Password</p>
              <hr />
            </div>
            {isError && (
              <div id="error_block">
                <p>{isError}</p>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="password">
                <PasswordIcon />
              </label>
              <input
                type={visibility ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

export default ResetPassword;
