import axios from "axios";
import React, { useEffect, useState, useRef, Fragment } from "react";
import { useLocation,useNavigate } from "react-router-dom";

const OtpVerify = () => {
  const location = useLocation();
  const otpdata = location.state ? location.state : " ";
  localStorage.setItem("otp", JSON.stringify(otpdata));
  const [otpDisplay, setDisplayOtp] = useState({});
  const [otpArr, setOtpArr] = useState(["", "", "", "", "", ""]);
  const [isError,setIsError]=useState("")
  const navigate=useNavigate()
  const inputRefs=useRef([]);

  useEffect(() => {
    setDisplayOtp(JSON.parse(localStorage.getItem("otp")));
  }, []);

  const otpOnChangeHandler=(e,i)=>{
    const value=e.target.value;
    const newOTP=[...otpArr]
    newOTP[i]=value
    setOtpArr(newOTP);
  }

  const isVerified=async(data)=>{
    try{
      const res=await axios.post("http://localhost:5000/api/v1/users/otp_verify",
      {code:data,email:otpDisplay.email},
      {headers:{
        "Content-Type": "application/json",
      }});
      const res_data=res.data;
      console.log(res_data)
    }catch(err){
      console.error("Error:", `${err.message}`);
      setIsError(`${err.message}`);
    }
  }
  const otpOnSubmit=(e)=>{
    e.preventDefault();
    const otp_input=otpArr.join("")
    if(!otp_input){
      setIsError("Please enter complete OTP Code")
    }else if(otpDisplay.otp===parseInt(otp_input)){
      isVerified(otp_input)
      setIsError("")
      localStorage.removeItem("otp")
      navigate("/complete_profile")
    }else{
      setIsError("Entered OTP does not match")
    }
  }
  return (
    <>
      <div className="otp-verify-page">
        <h1>OTP CODE</h1>
        <h1>{otpDisplay.otp}</h1>
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
                  onChange={(e)=>otpOnChangeHandler(e,i)}
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
