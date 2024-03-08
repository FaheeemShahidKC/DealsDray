import { User } from "../model/userModel.js";
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    try {

        const { name, email, number, password } = req.body
        console.log(number);

        let user = await User.findOne({ email: email });
        let hashedPass = await bcrypt.hash(password, 10);

        if (!user) {
            const newUser = new User({
                name: name,
                email: email,
                number: number,
                password: hashedPass,
                is_Admin: false
            })

            const userData = await newUser.save()
            const token = Jwt.sign({
                userId: userData._id
            }, process.env.TOKEN_KEY,
                { expiresIn: "1h" }
            )
            res.json({ userData, alert: "registered", token, status: true })
        } else {
            res.json({
                alert: "user already exist",
                status: false
            })
        }


    } catch (error) {
        console.log(error.message);
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body
        console.log(email);

        let userFound = await User.findOne({ email: email })
        console.log(userFound);

        if (userFound) {
            const passMatch = await bcrypt.compare(password, userFound.password)

            if (userFound.email == email && passMatch && userFound.is_Admin != true) {

                const token = Jwt.sign({
                    userId: userFound._id,

                }, process.env.TOKEN_KEY,
                    { expiresIn: "1h" }
                )

                res.json({ userFound, token, status: true })
            } else {
                res.json({ status: false, error: "Incorrect password" })
            }
        } else {
            res.json({ status: false, error: "Email not found" })
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const editprofile = async (req, res) => {
    try {
        const { id, name, email, phone } = req.body;
        console.log(name);
        const oldData = await User.findOne({ _id: id })

        const file = req.file ? req.file.filename : oldData.image

        let updatedData = await User.findByIdAndUpdate(id, {
            $set: {
                name: name,
                email: email,
                number: phone,
                image: file
            }
        }, { new: true })
        if (typeof updatedData == 'object') {
            res.json({ updatedData, status: true })
        } else {
            console.log("update failed");
        }
    } catch (error) {

        console.log(error.message);
    }
}

export const getDetails = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        let user = await User.findById(id)
        res.json({ user })

    } catch (error) {
        console.log(error.message);
    }
}