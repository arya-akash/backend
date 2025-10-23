import mongoose  from "mongoose";
import { DB_Name } from "../constant.js";

const connectDB=async()=>{
    try{
        const connectionInstance=await mongoose.connect
        (`${process.env.MONGODB_URI}/${DB_Name}`)
        console.log(`\n MOngoDB connected !! DB HOST: 
            ${connectionInstance.connection.host}`)
    }catch(error){
        console.log("MONGODB CONNECTION ERROR ",error);
        process.exit(1)
    }
}

export default connectDB