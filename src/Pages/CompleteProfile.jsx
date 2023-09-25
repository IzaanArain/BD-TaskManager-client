import React from "react";
import { FaUser, FaPhone } from "react-icons/fa";
import { FaRegUserCircle as UserLogo } from "react-icons/fa";
const CompleteProfile = () => {
  return (
    <>
      <div className="submit_page">
        <div className="submit_form">
          <form>
          <div id="user_logo">
              <UserLogo />
            </div>
            <hr />
            <div className="form_heading">
              <p>Complete Profile</p>
              <hr />
            </div>
            <div className="form-group">
              <label htmlFor="name">
                <FaUser />
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="user name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">
                <FaPhone />
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                maxLength="11"
                placeholder="user phone number"
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

export default CompleteProfile;
