import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from './apiError';
import fs from 'fs';    

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
   });


async function uploadImageOnCloudinary(localFilePath: string) {
try {
    if(!localFilePath){
        throw new ApiError(400,"File path is required");
    }
        
         const uploadResult = await cloudinary.uploader
           .upload(
            localFilePath,{ folder: 'talkwise'})
          
            if(!uploadResult){
                throw new ApiError(500,"Failed to upload image");
            }

            fs.unlinkSync(localFilePath);

            return { url: uploadResult.secure_url, public_id: uploadResult.public_id }
        } catch (error:any) {
            fs.unlinkSync(localFilePath)
        throw new ApiError(500, "Failed to upload image");
    }   
}

export default uploadImageOnCloudinary;