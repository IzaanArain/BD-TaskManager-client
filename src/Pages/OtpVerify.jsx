import axios from "axios";
import React, { useEffect, useState, useRef, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OtpVerify = () => {
  const location = useLocation();
  const userEmail = location?.state?.email ? location?.state?.email : "";
  const [otpArr, setOtpArr] = useState(["", "", "", "", "", ""]);
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const otpOnChangeHandler = (e, i) => {
    const value = e.target.value;
    const newOTP = [...otpArr];
    newOTP[i] = value;
    setOtpArr(newOTP);
    // logic to move to the next input
    if (value === "" && i > 0) {
      inputRefs.current[i - 1].focus();
    } else if (i < otpArr.length - 1 && value !== "") {
      inputRefs.current[i + 1].focus();
    }
  };

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
    const otp_input = otpArr.join("");
    if (!otp_input) {
      setIsError("Please enter complete OTP Code");
    }else if (otp_input.length !== 6) {
      setIsError("OTP code must be six digits");
    } else if (userEmail) {
      isVerified(otp_input)
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
      <div className="otp-verify-page">
        <h1>OTP CODE</h1>
        {isError && (
          <div id="error_block">
            <h2>{isError}</h2>
          </div>
        )}
        <form onSubmit={otpOnSubmit}>
          <div className="otp-input-container">
            {otpArr.map((number, i) => {
              return (
                <input
                  key={i}
                  value={number}
                  onChange={(e) => otpOnChangeHandler(e, i)}
                  type="text"
                  className="otp-input-box"
                  maxLength={1}
                  size={1}
                  pattern="^[0-9]*$"
                  title="must be a number"
                  ref={(input) => (inputRefs.current[i] = input)}
                />
              );
            })}
          </div>
          <input type="submit" id="otp-btn" value="Verify" />
        </form>
      </div>
    </>
  );
};

export default OtpVerify;
