    import React, { useEffect, useState } from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import { updateApi } from '../../../Api/UserApi';
    import { setUserDetails } from '../../../Store/slice/UserSlice';
    import { useNavigate } from 'react-router-dom';
    import NavBar from '../NavBar/NavBar';
    function Profile() {
        const emailPattern =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    

        const oldData = useSelector((state) => state.user);
        // console.log(oldData);
        const dispatch = useDispatch();
        const nagivate = useNavigate()
        const initialState = {
            id: oldData.id ,
            name: oldData.userName ,
            phone: oldData.phone  ,
            email: oldData.email  ,
            image: oldData.image 
        };
        console.log("profile");
    console.log(oldData);
        const [userData, setUserData] = useState(initialState);
        // console.log(userData);
        const [error,setError] = useState("")
        const [imagePreview, setImagePreview] = useState(userData.image ? `public/uploads/${userData.image}` : "");
        // console.log(imagePreview);

        function handleImageChange(e){
            let file = e.target.files[0];
            if (file) {
                setUserData((prevUserData) => ({ ...prevUserData, image: file }));
                setImagePreview(URL.createObjectURL(file));
            }
        }


        async function editProfile(e) {
            e.preventDefault();
            setUserData((prevUserData) => ({ ...prevUserData }));
            try {
                const data = await updateApi(userData);
        
                if (!emailPattern.test(userData.email)) {
                    setError("Invalid email format");
                } else if (userData.name.length < 4) {
                    setError("Name must contain 4 characters");
                } else if (userData.phone && userData.phone.length < 10) {
                    setError("Phone must contain 10 digits");
                } else {
                    const updatedUserData = data.data.updatedData;
                    console.log("++++++");
                    console.log(updatedUserData);
        
                    dispatch(setUserDetails({
                        id: updatedUserData._id,
                        userName: updatedUserData.name,
                        phone: updatedUserData.number,
                        email: updatedUserData.email,
                        image: updatedUserData.image,
                        is_Admin: updatedUserData.is_Admin
                    }));
        
                    nagivate("/")
                }
            } catch (error) {
                // Handle the error, you can log it or show an error message
                console.error("Error updating user:", error);
                setError("Error updating user details");
            }
        }
        

        return (
            <>
            <NavBar/>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="150px" src={imagePreview ? imagePreview : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} alt="Profile" />
                        
                            <span className="text-black-50">{userData.name}</span>
                            <span />
                        </div>
                    </div>
                    <div className="col-md-5 border-right">
                        <form onSubmit={editProfile}>
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Profile Settings</h4>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label className="labels">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="first name"
                                            value={userData.name}
                                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <label className="labels">Mobile Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="enter phone number"
                                            value={userData.phone}
                                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Email ID</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="enter email id"
                                            value={userData.email}
                                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3 mt-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Image</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input
                                            type="file"
                                            className="form-control col-input"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 text-center">
                                    <button className="btn btn-primary profile-button text-dark" type="submit">Save Profile</button>
                                </div>
                                {error && <span style={{color:"red",justifyContent:"center",alignItems:"center", display:"flex"}}>{error}</span>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </>
            
        );
    }

    export default Profile;
