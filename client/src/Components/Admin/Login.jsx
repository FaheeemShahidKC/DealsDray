import React, { useState } from 'react'
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { login } from '../../Api/AdminApi';
import { useNavigate } from 'react-router-dom';
function Login() {
  
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate()
  async function handleLogin(e){
    e.preventDefault()
    try {
    
      let   adminData = await login({email,password})
     console.log(adminData);
      if (adminData.status) {
        localStorage.setItem("adminToken",adminData.adminFound.data);
        navigate('/admin/dashboard')

      }else{
        console.log("hehe");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-white">


    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
       Admin Login
      </Typography>
      
      <form onSubmit={handleLogin}  className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
       
          
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input onChange={(e) => setEmail(e.target.value)}
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        
          
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input onChange={(e)=>setPassword(e.target.value)}
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        <Button type="submit" className="mt-6" fullWidth>
          Login
        </Button>
      
      </form>
    </Card>
  </div>
  )
}

export default Login
