import React from 'react'
import {FaUser,FaPhone} from "react-icons/fa"
import {TfiEmail}from 'react-icons/tfi'
import {RiLockPasswordFill as PasswordIcon} from 'react-icons/ri'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import DeleteButton from '../components/DeleteButton';
const EditUser = () => {
  const {userAuth,setUserAuth}=useAuthContext();
  const token=userAuth.userAuth;
  const userImage=userAuth?.image;
  const [newUser,setNewUser]=useState({
    name:"",
    email:"",
    password:"",
    phone:"",
  });

  const navigate=useNavigate()

  useEffect(()=>{
    const getUser=async()=>{
      try{
        const res=await axios.get("http://localhost:5000/api/v1/users/",
        {
          headers:{
            "authorization" : `Bearer ${token}`,
          }
        })
        const data=await res.data
        const userData=data.user
        setNewUser({
          name:userData.name,
          email:userData.email,
          phone:userData.phone
        });
      }catch(err){
        console.error("Error",err.message)
      }
    };
    getUser()
  },[])

  const OnChangeHandler=(e)=>{
    const {value,name}=e.target
    setNewUser((prev)=>({...prev,[name]:value}));
  }
  // console.log(newUser);

  const edit_api=async(data)=>{
    const res=await axios.put("http://localhost:5000/api/v1/users/update/",
    {...data},
    { headers:{
      "authorization" : `Bearer ${token}`,
    }})
    const userData=await res.data
    const user_d=userData.user;
    // console.log(userData)
    setUserAuth(user_d)
    return userData
  }
  const editOnSubmit=(e)=>{
    e.preventDefault()
    edit_api(newUser)
    navigate("/")
  }
  return (
    <>
    <div className="submit_page">
      <div className="submit_form">
        <form onSubmit={editOnSubmit}>
          <img src={`http://localhost:5000/${userImage}`} alt="user image" width={"200px"} height={"200px"} id='user-image'/>
          <div className="form_heading">
          <p>Edit User</p>
          <p>must enter password for editing profile</p>
          </div>
          <div className="form-group">
            <label htmlFor="name"><FaUser/></label>
            <input type="text"
            name='name'
            id='name'
            value={newUser.name}
            onChange={OnChangeHandler}
            placeholder='user name'
            required />
          </div>
          <div className="form-group">
            <label htmlFor="email"><TfiEmail/></label>
            <input type="email"
            name='email'
            id='email'
            value={newUser.email}
            onChange={OnChangeHandler}
            placeholder='user email'
            required />
          </div>
          <div className="form-group">
            <label htmlFor="password"><PasswordIcon/></label>
            <input type="password"
            name='password'
            id='password'
            placeholder='user password'
            value={newUser.password}
            onChange={OnChangeHandler}
            required/>
          </div>
          <div className="form-group">
            <label htmlFor="phone"><FaPhone/></label>
            <input type="tel"
            name='phone'
            id='phone'
            maxLength="11"
            value={newUser.phone}
            onChange={OnChangeHandler}
            placeholder='user phone number'
            required />
          </div>

          <input type="submit" id='submit_btn' value="SUBMIT"/>
          <DeleteButton/>
        </form>
      </div>
    </div>
    </>
  )
}

export default EditUser