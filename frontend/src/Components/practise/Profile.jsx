import React, { useContext } from 'react'
import UserContext from '../../Context/UserContext'
 

function Profile() {
  const {user} = useContext(UserContext);
  if(!user) {
    return <h1>not logged in</h1>
  }
  return (
    <div>Profile : {user.username}</div>
  )
}

export default Profile