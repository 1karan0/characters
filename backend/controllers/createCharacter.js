const Character = require("../models/characterModel");
const Univers =require('../models/UniversModel');
const { cloudinary } = require("../config/cloudinary");

function isFileSupported(type, supportedType) {
  return supportedType.includes(type);
}
async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.createCharacter = async (req, res) => {
  try {
    const { name, title, shortdescription, fulldescription, univers } =
      req.body;
    // console.log(
    //   "name =",
    //   name,
    //   "title =",
    //   title,
    //   "shortdescription =",
    //   shortdescription,
    //   "fulldescription =",
    //   fulldescription,
    //   "univers =",
    //   univers
    // );
    const file = req.files.file;
    // console.log("file = ", file);
    const supportedType = ["jpg", "png", "jpeg"];
    const fileType = file.name.split(".")[1].toLowerCase();
    // console.log("file type ", fileType);
    if (!isFileSupported(fileType, supportedType)) {
      return res.status(400).json({
        success: false,
        message: "file format is not supported",
      });
    }
    const response = await uploadFileToCloudinary(file, "charApp");

    // Check required fields
    if (!req.files || !req.files.file || !name || !title || !shortdescription || !fulldescription || !univers) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const universeExists = await Univers.findById(univers);
    if (!universeExists) {
      return res.status(404).json({
        success: false,
        message: "Universe not found",
      });
    }
    
    const character = await Character.create({
      name,
      title,
      shortdescription,
      fulldescription,
      image: response.secure_url,
      univers:univers,
    });

    res.status(200).json({
      success: true,
      message: "Character created successfully",
      data:character
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
