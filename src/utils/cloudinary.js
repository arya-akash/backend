import { v2 as cloudinary } from "cloudinary";
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.cloud_name1, 
  api_key: process.env.api_key1, 
  api_secret: process.env.api_secret1
});

const uploadCloudinary=async(localFilePath)=>{
    try{
        if(!localFilePath) return null
        //upload the file on cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file upload successfullly
        console.log("file is upload on cloudinary",response.url);
        return response;
    }catch(error){
        fs.unlink(localFilePath)//localy remove the saved temproary file as the upload
        return null;
    }
}

export default uploadCloudinary