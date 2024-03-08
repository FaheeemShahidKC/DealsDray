import React from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { logoutDetails } from '../../../Store/slice/UserSlice'
import { useNavigate } from 'react-router-dom'

function NavBar() {
  let user = useSelector((state) => state.user)
  console.log(user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  function logOut(){


    localStorage.removeItem('token')
    dispatch(logoutDetails())
    navigate('/')

    

     
  }
  return (
    <div>
      <nav class="navbar navbar-light bg-light justify-content-between">
  <h1 class="navbar-brand">{user.userName? user.userName : " "}</h1>
  <form class="form-inline">
    
    <button onClick={logOut} class="btn btn-outline-success my-2 my-sm-0" type="submit">log out</button>
  </form>
</nav>
    </div>
  )
}

export default NavBar
