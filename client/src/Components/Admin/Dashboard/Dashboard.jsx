import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import Table from '../Table/Table'
import { deleteUser, userDetails } from '../../../Api/AdminApi'
function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("")
  const [searchList, setSearchList] = useState([])
  let obj = {
    search: search,
    setSearch: setSearch,
    searchList: searchList,
    setSearchList: setSearchList,
    users: users,
  }
  const fetchUserData = async () => {
    try {
      let userData = await userDetails()
      setSearchList(userData.users)
      setUsers(userData.users)

    } catch (error) {

      console.error('Error fetching user data:', error)
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const deleteuser = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        deleteUser(id).then(() => {

          fetchUserData()
        });
      }
    });
  };
  return (
    <>
      <div>
        <NavBar obj={obj} />
      </div>
      {
        searchList.length > 0 ? <Table searchList={searchList} deleteuser={deleteuser}></Table> :  <p className='text-black-500 text-3xl text-center mt-8'>No users found</p>
      }
    </>
  );
}

export default Dashboard
