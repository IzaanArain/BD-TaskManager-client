import React from "react";

const OtpVerify = () => {
  return (
    <>
      <div className="otp-verify-page">
        <h1>OTP CODE</h1>
        <h2>CODE</h2>
        <div className="otp-input-container">
          <input type="text" className="otp-input-box" maxLength={1}/>
          <input type="text" className="otp-input-box" maxLength={1}/>
          <input type="text" className="otp-input-box" maxLength={1}/>
          <input type="text" className="otp-input-box" maxLength={1}/>
          <input type="text" className="otp-input-box" maxLength={1}/>
          <input type="text" className="otp-input-box" maxLength={1}/>
        </div>
      </div>
    </>
  );
};

export default OtpVerify;
