import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../Pages/Admin/LoginPage'
import AddUserPage from '../Pages/Admin/AddUserPage'
import AdminLoginAuth from '../Authentication/AdminLoginAuth'
import AdminLogoutAuth from '../Authentication/AdminLogoutAuth'
import Dashboard from '../Components/Admin/Dashboard/Dashboard'
import EditPage from '../Pages/Admin/EditPage'

function AdminRoute() {
  return (
    <Routes>
      <Route path='/' element={<AdminLogoutAuth><LoginPage /></AdminLogoutAuth>} />
      <Route path='/dashboard' element={<AdminLoginAuth><Dashboard /></AdminLoginAuth>} />
      <Route path='/edituser/:id' element={<AdminLoginAuth><EditPage /></AdminLoginAuth>} />
      <Route path='/adduser' element={<AdminLoginAuth><AddUserPage /></AdminLoginAuth>} />
    </Routes>
  )
}

export default AdminRoute
