import  express from "express";
import adminRoute from './routes/adminRoute.js'
import connection from "./config/mongoose.config.js";
import cors from 'cors'
import dotenv from 'dotenv'

let app = express()

dotenv.config()
connection()

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/admin',adminRoute)

app.listen(3000,() =>{
    console.log("server is running");
})

export default app