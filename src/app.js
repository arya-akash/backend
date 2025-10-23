import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app=express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,  //used in production from which wbesite can acces our backend
    credentials:true
}))

app.use(express.json({limit:"16kb"})) //is used in your Express.js backend to handle JSON data sent in HTTP requests — for example, when a client sends data using a POST or PUT request.
app.use(express.urlencoded({extended: true,limit:"16kb"}))
app.use(express.static("public")) //this line means that any photo  in public folder it accessible
app.use(cookieParser())


import userRouter from './routes/user.routes.js'


app.use("/api/v1/users",userRouter)  //best practice

export default app;