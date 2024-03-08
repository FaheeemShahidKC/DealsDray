import mongoose from "mongoose";


const connection = async () => {
    try {
        const connection = await mongoose.connect('mongodb://localhost:27017/user-management');

        console.log("data base connected");

    } catch (error) {

        console.log(error.message);

    }
}
export default connection
