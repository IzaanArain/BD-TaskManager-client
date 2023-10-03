import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import UserCard from '../components/UserCard';
import { useUserContext } from '../Hooks/useUserContext';
import { useAuthContext } from '../Hooks/useAuthContext';

const Home = () => {
const users=useUserContext();
const {userAuth}=useAuthContext()
  return (
    <>
   {users ? ( <div className="userList">
    {users.map((user,i)=>{
        return(
          <Fragment key={i}>
            <UserCard user={user}/>
          </Fragment>
        )
      }) }
    </div>) : (<h1>Loading...</h1>)}
    </>
  )
}

export default Home