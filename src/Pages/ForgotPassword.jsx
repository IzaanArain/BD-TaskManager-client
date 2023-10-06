import axios from "axios";
import { useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const forgotPasswordApi = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/users/forgot_password",
       {email:data},
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

  const onSubmit = (e) => {
    e.preventDefault();
    forgotPasswordApi(email)
      .then((res) => {
        const userEmail=res?.email
        navigate("/simple_otp_verify",{state:{email:userEmail}});
      })
      .catch((err) => {
        console.error("Error", err);
        setIsError(err);
      });
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
              <p>Enter Email</p>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user email"
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
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

export default ForgotPassword;
