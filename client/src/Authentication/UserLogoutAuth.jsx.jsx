import React from 'react'
import { Navigate } from 'react-router-dom'

function userLogoutAuth({children}) {
  console.log("ehe");
    const hasToke = Boolean(localStorage.getItem('token'))
    console.log(hasToke);
  return hasToke ? <Navigate to = "/"/> : children
     
  
}

export default userLogoutAuth
