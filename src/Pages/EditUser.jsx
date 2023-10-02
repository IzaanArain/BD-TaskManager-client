import React from "react";
import { FaUser, FaPhone } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordFill as PasswordIcon } from "react-icons/ri";
import { BsFillFileEarmarkImageFill as PictureLogo } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../components/DeleteButton";
import userPic from "../assets/user-image.jpg";
const EditUser = () => {
  const { userAuth, setUserAuth } = useAuthContext();
  const token = userAuth?.userAuth;
  const userImage = userAuth?.image;
  const [newUser, setNewUser] = useState({
    name: "",
    phone: "",
    image: "",
  });
  const [isError, setIsError] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/users/", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const data = await res.data;
        const userData = data.user;
        setNewUser({
          name: userData.name,
          phone: userData.phone,
        });
      } catch (err) {
        console.error("Error", err.response.data.message);
        setIsError(err.response.data.message);
      }
    };
    getUser();
  }, []);

  const OnChangeHandler = (e) => {
    const { value, name } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };
  const onChangeFileHandler = (e) => {
    setNewUser((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const edit_api = async (data) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/v1/users/update",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = await res.data;
      const user_d = userData.user;
      return user_d;
    } catch (err) {
      console.error("Error", err.response.data.message);
      setIsError(err.response.data.message);
    }
  };

  const formData = new FormData();
  formData.append("name", newUser.name);
  formData.append("phone", newUser.phone);
  formData.append("image", newUser.image);

  const editOnSubmit = (e) => {
    e.preventDefault();
    edit_api(formData).then((userData) => {
      setUserAuth(userData);
    });
  };
  return (
    <>
      <div className="submit_page">
        <div className="submit_form">
          <form onSubmit={editOnSubmit} encType="multipart/form-data">
            <img
              src={userImage ? `http://localhost:5000/${userImage}` : userPic}
              alt="user image"
              width={"200px"}
              height={"200px"}
              id="user-image"
            />
            <div className="form_heading">
              <p>Edit User</p>
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
                onChange={OnChangeHandler}
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
                onChange={OnChangeHandler}
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
            <DeleteButton />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
