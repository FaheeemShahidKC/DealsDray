import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadDetails, updateUser } from '../../Api/AdminApi';
import { Card, Typography, Input, Button } from '@material-tailwind/react';

const Checkbox = ({ label, value, name, checked, onClick }) => {
  return (
    <label>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onClick}
      />
      {label}
    </label>
  );
};

function EditUser() {
  const { id } = useParams();
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: id,
    name: '',
    number: '',
    email: '',
    gender: '',
    designation: '',
    course: ''
  });

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [numberError, setNumberError] = useState('')

  useEffect(() => {
    loadDetails(id).then((data) => {
      setFormData({
        id: data.specificUser._id,
        name: data.specificUser.name,
        number: data.specificUser.number,
        email: data.specificUser.email,
        designation: data.specificUser.designation,
        course: data.specificUser.course,
        gender: data.specificUser.gender,
        image: data.specificUser.image,
      });
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenderChange = (e) => {
    const { value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  };

  const handleCheckboxChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      course: value,
    }));
  };

  const validateName = () => {
    if (formData.name.trim() === '') {
      setNameError('Name is required');
      return false;
    }
    setNameError('');
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setEmailError('Enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validateNumber = () => {
    const numberRegex = /^\d+$/;
    if (!formData.number.trim() || !numberRegex.test(formData.number.trim()) || formData.number.length !== 10) {
      setNumberError('Enter a valid phone number');
      return false;
    }
    setNumberError('');
    return true;
  };

  const handleDesignationChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateName() && validateEmail() && validateNumber()) {
      updateUser(formData).then((data) => {
        navigate('/dashboard');
      })
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Edit User
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your name"
              className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${nameError && 'border-red-500'}`}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={validateName}
            />
            {nameError && <Typography color="red" className="text-xs">{nameError}</Typography>}

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your email"
              className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${emailError && 'border-red-500'}`}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={validateEmail}
            />
            {emailError && <Typography color="red" className="text-xs">{emailError}</Typography>}

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Number
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your number"
              className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${numberError && 'border-red-500'}`}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              onBlur={validateNumber}
            />
            {numberError && <Typography color="red" className="text-xs">{numberError}</Typography>}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Designation
            </Typography>
            <div>
              <label htmlFor="designation">Select Designation:</label>
              <select
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleDesignationChange}
              >
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Gender
            </Typography>
            <div className="flex gap-10">
              <label>Selected Gender: {formData.gender}</label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleGenderChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleGenderChange}
                />
                Female
              </label>
            </div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Course
            </Typography>
            <span>
              <Checkbox onClick={() => handleCheckboxChange('MCA')} label="MCA" value="MCA" name="MCA" checked={formData.course === 'MCA'} /> <br />
              <Checkbox onClick={() => handleCheckboxChange('BCA')} label="BCA" value="BCA" name="BCA" checked={formData.course === 'BCA'} /> <br />
              <Checkbox onClick={() => handleCheckboxChange('BSC')} label="BSC" value="BSC" name="BSC" checked={formData.course === 'BSC'} /> <br />
            </span>
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Update
          </Button>
        </form>
      </Card>
    </div >
  );
}

export default EditUser;





