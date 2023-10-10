import React from "react";
import axios, { Axios } from "axios";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const DeleteButton = () => {
  const { userAuth, setUserAuth } = useAuthContext();
  const token = userAuth?.userAuth;
  const navigate=useNavigate()
  const [isError, setIsError] = useState("");

  const delete_api = async () => {
    if(token){
      try {
        const res = await axios.delete(
          "http://localhost:5000/api/v1/users/user_delete",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.data;
        console.log(data);
      } catch (err) {
        throw err.response.data.message;
      }
    }
  };

  const deleteUser = (e) => {
    e.preventDefault();
    delete_api().then(()=>{
      setUserAuth(null);
      navigate("/login");
    }).catch((err)=>{
      console.error("Error", err);
      setIsError(err);
    })
  };
  return (
    <>
      <button className="modal-btn" onClick={deleteUser}>
        Delete
      </button>
    </>
  );
};

export default DeleteButton;
