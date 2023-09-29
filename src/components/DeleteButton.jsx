import React from "react";
import axios, { Axios } from "axios";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const DeleteButton = () => {
  const { userAuth, setUserAuth } = useAuthContext();
  const token = userAuth?.userAuth;
  const navigate=useNavigate()
  const delete_api = async () => {
    if(token){
      try {
        const res = await axios.delete(
          "http://localhost:5000/api/v1/users/delete",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.data;
        // console.log(data.user);
      } catch (err) {
        console.error("Error", err.message);
      }
    }
  };

  const deleteUser = (e) => {
    e.preventDefault();
    delete_api();
    // const user = JSON.parse(localStorage.getItem("user"));
    // delete user.userAuth;
    localStorage.setItem("user",JSON.stringify({}));
    const logoutState = localStorage.getItem("user");
    setUserAuth(logoutState);
    navigate("/login");
  };
  return (
    <>
      <button id="delete_btn" onClick={deleteUser}>
        Delete
      </button>
    </>
  );
};

export default DeleteButton;
