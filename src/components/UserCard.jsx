import React from 'react'

const UserCard = (props) => {
    const {user}=props
  return (
    <>
    <div className="user_card">
        <h1>{user.name}</h1>
        <h2>{user.email}</h2>
        <h2>{user.phone}</h2>
    </div>
    </>
  )
}

export default UserCard