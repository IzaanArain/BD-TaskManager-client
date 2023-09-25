import React, { useEffect, useState, useRef, Fragment } from "react";
import { useLocation } from "react-router-dom";

const OtpVerify = () => {
  const [otpArr, setOtpArr] = useState(["", "", "", "", "", ""]);
  const [otp, setOtp] = useState({});
  const location = useLocation();
  const otpdata = location.state ? location.state : " ";
  localStorage.setItem("otp", JSON.stringify(otpdata));
  const otp_d = JSON.parse(localStorage.getItem("otp"));
  
  useEffect(() => {
    setOtp(otp_d);
  }, []);

  return (
    <>
      <div className="otp-verify-page">
        <h1>OTP CODE</h1>
        <h1>{otp.otp}</h1>
        <form>
          <div className="otp-input-container">
            {otpArr.map((number, i) => {
              return (
                <input
                  key={i}
                  value={number}
                  type="text"
                  className="otp-input-box"
                  maxLength={1}
                  size={1}
                  pattern="^[0-9]*$"
                  title="must be a number"
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
