import React from 'react'
import { useNavigate } from 'react-router-dom'

function Table({ searchList, deleteuser }) {
     const navigate = useNavigate()
     return (
          <div>
               <table className="table mt-5">
                    <thead className='text-center'>
                         <tr className=''>
                              <th scope="col">ID</th>
                              <th scope="col">profile</th>
                              <th scope="col">Created at</th>
                              <th scope="col">First name</th>
                              <th scope="col">Number</th>
                              <th scope="col">Email</th>
                              <th scope='col'>Gender</th>
                              <th scope='col'>Designation</th>
                              <th scope='col'>Course</th>
                              <th scope="col">Action</th>
                         </tr>
                    </thead>
                    <tbody className='text-center'>
                         {searchList.map((user, index) => (
                              <tr key={index}>
                                   <th scope="row">{index + 1}</th>
                                   <td><div className='m-1 w-8 ' ><img src={`public/uploads/${user.image}`} alt="" /></div></td>
                                   <td>{user.createAt}</td>
                                   <td>{user.name}</td>
                                   <td>{user.number}</td>
                                   <td>{user.email}</td>
                                   <td>{user.gender}</td>
                                   <td>{user.designation}</td>
                                   <td>{user.course}</td>
                                   <td>
                                        <button onClick={() => navigate(`/edituser/${user._id}`)} className='btn btn-primary mr-2'>edit</button>
                                        <button onClick={() => deleteuser(user._id)} className='btn btn-primary'>delete</button>
                                   </td>
                              </tr>
                         ))}
                    </tbody>
               </table>
          </div>
     )
}

export default Table
