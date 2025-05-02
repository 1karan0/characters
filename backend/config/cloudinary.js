const cloudinary = require('cloudinary').v2;
require('dotenv').config()

exports.cloudinaryconnect = ()=>{
    try{
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key :process.env.API_KEY,
            api_secret :process.env.API_SECRET
        })
    }
    catch(err){
        console.log(err);
        
    }
}
exports.uploadFileToCloudinary = async (file, folder) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.tempFilePath, {
        folder: folder
      }, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  };

  exports.cloudinary = cloudinary