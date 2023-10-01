import React, { useState } from "react";
import { FaUser, FaPhone } from "react-icons/fa";
import { FaRegUserCircle as UserLogo } from "react-icons/fa";
import { BsFillFileEarmarkImageFill as PictureLogo } from "react-icons/bs";
import { useAuthContext } from "../Hooks/useAuthContext";
import axios from "axios";
import { Navigate } from "react-router-dom";
const CompleteProfile = () => {
  const [newUser, setNewUser] = useState({
    email: "",
    name: "",
    phone: "",
    image: "",
  });
  const [isError, setIsError] = useState("");
  const user = useAuthContext();
  const userEmail = user?.userAuth?.email ? user?.userAuth?.email : "";
  const token = user?.userAuth?.userAuth ? user?.userAuth?.userAuth : "";

  const formData = new FormData();
  formData.append("email", userEmail);
  formData.append("name", newUser.name);
  formData.append("phone", newUser.phone);
  formData.append("image", newUser.image);
  const postCompleteProfile = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/users/complete_profile",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Error:", `${err.response.data.message}`);
      setIsError(err.response.data.message);
    }
  };

  const onChangeHandler = (e) => {
    const { value, name, file } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value, email: userEmail }));
  };

  const onChangeFileHandler = (e) => {
    setNewUser((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const submitCompleteForm = (e) => {
    e.preventDefault();
    postCompleteProfile(formData);
    if(user.isComplete===true){
      Navigate("/edit")
    }
  };
  return (
    <>
      <div className="submit_page">
        <div className="submit_form">
          <form onSubmit={submitCompleteForm} encType="multipart/form-data">
            <div id="user_logo">
              <UserLogo />
            </div>
            <div className="form_heading">
              <hr />
              <p>Complete Profile</p>
              <hr />
            </div>
            {isError && (
              <div id="error_block">
                <p>{isError}</p>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="name">
                <FaUser />
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={newUser.name}
                onChange={onChangeHandler}
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
                value={newUser.phone}
                onChange={onChangeHandler}
                placeholder="user phone number"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">
                <PictureLogo />
              </label>
              <input
                type="file"
                filename="image"
                name="image"
                id="image"
                onChange={onChangeFileHandler}
                accept=".png, .jpg, .jpeg, .gif"
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
