import React from 'react'
import { Navigate } from 'react-router-dom';

function AdminLoginAuth({children}) {
    const isAdmin = Boolean(localStorage.getItem('adminToken'));
    // console.log(isAdmin);

  return isAdmin ? children : <Navigate to = '/admin/'/>
}

export default AdminLoginAuth
