import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config()
connectDB()

















// import mongoose from "mongoose";
// import express from "express"
// import { DB_Name } from "./constant";
// const app=express()

// ;(async()=>{
//     try{
//       mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//       app.on("error",(error)=>{
//         console.log("ERROR: ",error);
//         throw error
//       })

//       app.listen(process.env.PORT,()=>{
//         console.log(`Appp listen on ${process.env.PORT}`);
//       })
//     }catch(error){
//         console.error("ERROR: ",error)
//         throw err
//     }
// })()