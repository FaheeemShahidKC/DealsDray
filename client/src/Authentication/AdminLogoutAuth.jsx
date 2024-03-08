import React from 'react'
import { Navigate } from 'react-router-dom'

function AdminLogoutAuth({children}) {
     let isAdmin = Boolean(localStorage.getItem('adminToken'))
  return isAdmin ? <Navigate to ='/admin/dashboard'/> : children
}

export default AdminLogoutAuth
