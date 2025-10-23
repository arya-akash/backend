import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/index.js";


dotenv.config()


connectDB()
.then(()=>{
    app.listen(process.env.PORT ||8000,()=>{
      console.log(`server is running at: ${process.env.PORT}`);  
    })
})
.catch((err)=>{
   console.log("mogo db connection failed ",err); 
})

















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