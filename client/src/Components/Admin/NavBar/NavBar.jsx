import React from 'react'
import { useNavigate } from 'react-router-dom'

function NavBar({ obj }) {
  const { search, setSearch, searchList, setSearchList, users } = obj
  const searchUser = (e) => {

    const term = e.target.value
    setSearch(term)
    if (term.trim() === '') {
      setSearchList(users)
    } else {
      const regexPattern = new RegExp(`^${term}`, 'i')
      const searchData = searchList.filter((user) => regexPattern.test(user.name))
      setSearchList(searchData)
    }

  }
  let navigate = useNavigate()
  function logOut() {
    localStorage.clear('adminToken')
    navigate('/')
  }
  return (
    <div>
      <nav class="navbar navbar-light bg-light justify-between p-4">
        <a class="navbar-brand">DealsDray</a>
        <form class="form-inline">
          <input onChange={searchUser} class="form-control-sm border border-primary mr-3" type="search" placeholder="Search" aria-label="Search" />
          <button onClick={logOut} class="btn btn-outline-success my-2 my-sm-0" type="submit">LogOut</button>
          <button onClick={() => navigate('/adduser')} className='btn btn-outline-success ' >Add User</button>
        </form>
      </nav>
    </div>
  )
}

export default NavBar
