import { v2 } from "cloudinary";
import fs from "fs"


cloudinary.config({ 
  cloud_name: 'ddufg6q0l', 
  api_key: '423211826786378', 
  api_secret: 'D7Pg3HSzTgUnvZykockgZdV89Ps '
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
    }
}