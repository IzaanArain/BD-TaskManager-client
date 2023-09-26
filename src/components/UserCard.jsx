import React from 'react'
import userPic from '../assets/user-image.jpg';

const UserCard = (props) => {
    const {user}=props
    const userImage=user.image;
  return (
    <>
    <div className="user_card">
      <img src={userImage ? `http://localhost:5000/${userImage}` : userPic} 
      alt="user image" 
      width={"100px"} 
      height={"100px"} 
      id='user-image'/>
        <div>
        <h1>{user.name}</h1>
        <h2>{user.email}</h2>
        <h2>{user.phone}</h2>
        </div>
    </div>
    </>
  )
}

export default UserCard