import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLoginAuth from '../Authentication/UserLoginAuth';
import LoginPage from '../Pages/User/LoginPage';
import UserLogoutAuth from '../Authentication/UserLogoutAuth.jsx';
import DashboardPage from '../Pages/User/DashboardPage';
import ProfilePage from '../Pages/User/ProfilePage';
import SignupPage from '../Pages/User/SignupPage'

function UserRoute() {
  return (
    <Routes>
      <Route path='/' element={<UserLoginAuth><DashboardPage /></UserLoginAuth>} />
      <Route path='/signup' element={<UserLogoutAuth><SignupPage /></UserLogoutAuth>} />
      <Route path='/login' element={<UserLogoutAuth><LoginPage /></UserLogoutAuth>} />
      <Route path='/editprofile' element={<UserLoginAuth><ProfilePage /></UserLoginAuth>} />
    </Routes>
  )
}

export default UserRoute
