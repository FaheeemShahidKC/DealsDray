import {
  Card,
  Input,
  Button,
  Typography,
  Checkbox,
  Radio
} from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUserApi } from "../../Api/AdminApi";
import { validateEmail } from 'project-pack'

function AddUser() {
  let navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [designation, setDesignation] = useState("");
  const [course, setCourse] = useState(null);
  const [gender, setGender] = useState("");
  const [error, setError] = useState('')

  
  const handleCheckboxChange = (value) => {
    setCourse(value)
  }

  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  }

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  }

  async function handleSubmit(e) {

    e.preventDefault()

    if (name.length < 3) {
      return setError("Name must contain 3 letters")
    } else if (!validateEmail(email)) {
      console.log("validateEmail(email)");
      return setError("Invalid email format")
    } else if (number.length !== 10) {
      setError("Enter a valid number")
    } else if (designation.length === 0) {
      setError("Select the designation")
    } else if (gender.length === 0) {
      setError("Select the gender")
    }else if (course === null) {
      setError("Select the course")
    }

    const userData = await addUserApi({ name, email, number, designation, course, gender})

    if (userData.status) {
      navigate('/dashboard')
    } else {
      toast.error("user exist!!!")
    }
  }
  
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Card color="transparent" shadow={false}>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Name
            </Typography>
            <Input onChange={(e) => setName(e.target.value)}
              size="lg"
              placeholder="name"
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
              Designation
            </Typography>
            <div>
              <label htmlFor="designation">Select Designation:</label>
              <select id="designation" value={designation} onChange={handleDesignationChange}>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Gender
            </Typography>
            <div className="flex gap-10">
              <label>Selected Gender: </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Male"
                  checked={gender === 'Male'}
                  onChange={handleGenderChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Female"
                  checked={gender === 'Female'}
                  onChange={handleGenderChange}
                />
                Female
              </label>
            </div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Course
            </Typography>
            <span>
              <Checkbox onClick={() => handleCheckboxChange('MCA')} label="MCA" value="MCA" name="MCA" checked={course === 'MCA'} />
              <Checkbox onClick={() => handleCheckboxChange('BCA')} label="BCA" value="BCA" name="BCA" checked={course === 'BCA'} />
              <Checkbox onClick={() => handleCheckboxChange('BSC')} label="BSC" value="BSC" name="BSC" checked={course === 'BSC'} />
            </span>
          </div>
          {error && <span style={{ color: "red", justifyContent: "center", alignItems: "center", display: "flex" }}>{error}</span>}

          <Button type="submit" className="mt-6" fullWidth>
            Add User
          </Button>

        </form>
      </Card>
    </div>
  );
}
export default AddUser