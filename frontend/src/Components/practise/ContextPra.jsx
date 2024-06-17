import React, { useState } from 'react'
import Login from './Login'
import Profile from './Profile'
import UserContextProvider from '../../Context/UserContextProvider'

const ContextPra = () => {
  return (
    <UserContextProvider>
        <h1>React video for context api</h1>
        <Login />
        <Profile />
    </UserContextProvider>
  )
}

export default ContextPra