import { useState } from "react";
import { RiLockPasswordFill as PasswordIcon } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SimpleOtpVerify = () => {
  const [otpCode, setOtpCode] = useState("");
  const [isError, setIsError] = useState("");
  const location = useLocation();
  const userEmail = location?.state?.email ? location?.state?.email : "";

  const navigate = useNavigate();

  const isVerified = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/users/otp_verify",
        { code: data, email: userEmail },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res_data = res.data;
      return res_data?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  };
  const otpOnSubmit = (e) => {
    e.preventDefault();
    if (!otpCode) {
      setIsError("enter OTP code");
    } else if (otpCode.length !== 6) {
      setIsError("OTP code must be six digits");
    } else if (userEmail) {
      isVerified(otpCode)
        .then((user) => {
          const userEmail=user?.email
          if (user?.isForgetPassword) {
            navigate("/reset_password",{state:{email:userEmail}});
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.error("Error", err);
          setIsError(err);
        });
    } else {
      setIsError("user must be registered before OTP verification");
    }
  };
  
  return (
    <>
      <div className="submit_page">
        <div className="submit_form">
          <form onSubmit={otpOnSubmit}>
            <div id="user_logo">
              <PasswordIcon />
            </div>
            <div className="form_heading">
              <hr />
              <p>Enter OTP Code</p>
              <hr />
            </div>
            {isError && (
              <div id="error_block">
                <p>{isError}</p>
              </div>
            )}
            <div className="form-group-otp">
              <input
                id="simple-otp"
                name="otpCode"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                type="text"
                maxLength={6}
                size={6}
                pattern="^[0-9]*$"
                title="must be a number"
                required
              />
            </div>
            <input type="submit" id="submit_btn" value="Verify" />
          </form>
        </div>
      </div>
    </>
  );
};

export default SimpleOtpVerify;
