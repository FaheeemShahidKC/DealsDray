import express from "express";
import { signUp, login, editprofile, getDetails } from "../controllers/userController.js";
import { upload } from "../Middleware/multerConfig.js";
const userRoute = express();

userRoute.post('/signup', signUp)
userRoute.post('/login', login)
userRoute.post('/update', upload.single('image'), editprofile)
userRoute.post('/getdetails', getDetails)
export default userRoute