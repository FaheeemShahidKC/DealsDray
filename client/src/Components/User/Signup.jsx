import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { signupApi } from "../../Api/UserApi";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../Store/slice/UserSlice";
import { useNavigate } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast";

function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const [error,setError] = useState('')
  const emailPattern =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



  async function handleSubmit(e){
    e.preventDefault()
    if(name.length < 3){
      return  setError("Name must contain 3 letters")
      }else if(!emailPattern.test(email)){
      return  setError("Invalid email format")
      }else if(password.length < 4){
        return setError("Password must contain 4 character")
      }
    const userData = await signupApi({name,email,number,password})
    
   console.log(userData.userData);
    if (userData.status) {
       localStorage.setItem('token', userData.token)
       dispatch(setUserDetails({
        id: userData.userData._id,
        userName: userData.userData.name,
        email: userData.userData.email,
        image: "",
        phone: userData.userData.number,
        is_Admin: userData.userData.is_Admin,
       }))
       navigate('/')
    }else{
      toast.error(userData.alert)

    }
  }




  return (
    <div className="flex items-center justify-center h-screen bg-white">

<Toaster
  position="top-center"
  reverseOrder={false}
/>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form  onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input onChange={(e) => setName(e.target.value)}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
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
              Number
            </Typography>
            <Input onChange={(e) => setNumber(e.target.value)}
              type="number"
              size="lg"
              placeholder="number"
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
            sign up
          </Button>
          {error && <span style={{color:"red",justifyContent:"center",alignItems:"center", display:"flex"}}>{error}</span>}

          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
export default Signup