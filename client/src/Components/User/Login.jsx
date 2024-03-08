import React, { useState } from 'react'
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../../Api/UserApi';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../Store/slice/UserSlice';
function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  async function handleLogin(e) {
    e.preventDefault()
    try {
      if (!emailPattern.test(email)) {
        return setError("Invalid email format")
      } else if (password.length < 4) {
        return setError("Password must contain 4 character")
      }
      console.log("eheh");
      let userData = await loginApi({ email, password });
      console.log(userData);
      if (userData.status) {
        localStorage.setItem('token', userData.token)

        dispatch(setUserDetails({
          id: userData.userFound._id,
          userName: userData.userFound.name,
          email: userData.userFound.email,
          is_Admin: userData.userFound.is_Admin,
          image: userData.userFound.image,
          phone: userData.userFound.number,
        }))
        navigate('/')

      } else {
        setError(userData.error)

      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-white">


      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>

        <form onSubmit={handleLogin} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
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
            <Input onChange={(e) => setPassword(e.target.value)}
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
          {error && <span style={{ color: "red", justifyContent: "center", alignItems: "center", display: "flex" }}>{error}</span>}
          <Typography color="gray" className="mt-4 text-center font-normal">
            New to here ?{" "}
            <Link to='/signup' className="font-medium text-gray-900">
              SignUp
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  )
}

export default Login
