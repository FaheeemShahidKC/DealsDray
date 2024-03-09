import { User } from "../model/userModel.js";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        let adminFound = await User.findOne({ email: email })

        let isAdmin = await bcrypt.compare(password, adminFound.password);
        if (adminFound) {
            if (isAdmin && adminFound.is_Admin) {
                let token = Jwt.sign({
                    adminId: adminFound._id
                }, process.env.TOKEN_KEY, {
                    expiresIn: "1h"
                })
                res.json({ adminFound, token, status: true })
                console.log("true");
            } else {
                res.json({ status: false, error: "incorrect password" })
            }


        } else {
            res.json({ status: false, error: "no data found" })
        }

    } catch (error) {

        console.log(error.message);
    }
}

export const userDetails = async (req, res) => {
    try {
        let users = await User.find({ is_Admin: false })
        if (users) {
            res.json({ users })
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const loadDetails = async (req, res) => {
    try {
        const { id } = req.body;
        const specificUser = await User.findById(id)
        res.json({ specificUser })
    } catch (error) {
        console.log(error.message);
    }
}

export const updateDetails = async (req, res) => {
    try {
        const { id, name, email, number, designation, gender, course } = req.body;

        let updatedData = await User.findByIdAndUpdate(id, {
            $set: {
                name: name,
                email: email,
                number: number,
                designation: designation,
                gender: gender,
                course: course,
            }
        })
        console.log(updatedData);
        res.json({ updatedData })
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        let newData = await User.findByIdAndDelete(id)
        res.json({ newData })
    } catch (error) {
        console.log(error.message);
    }
}

export const addUser = async (req, res) => {
    try {
        let { name, email, number, designation, gender, course } = req.body;

        let userExist = await User.findOne({ email: email })
        console.log(userExist);
        if (userExist != null) {
            res.json({ status: false })
        } else {
            let newUser = new User({
                name: name,
                email: email,
                number: number,
                designation: designation,
                gender: gender,
                course: course,
            })
            await newUser.save();
            res.json({ status: true })
        }
    } catch (error) {
        console.log(error.message);
    }
}