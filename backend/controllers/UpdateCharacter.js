const Character = require("../models/characterModel");
const { cloudinary } = require("../config/cloudinary");


function isFileSupported(type, supportedType) {
  return supportedType.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.UpdateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, shortdescription, fulldescription, univers } = req.body;

    const updateData = {
      name,
      title,
      shortdescription,
      fulldescription,
      univers,
      updatedAt: Date.now(),
    };

    // If a new file is uploaded, process it
    if (req.files && req.files.file) {
      const file = req.files.file;
      const supportedType = ["jpg", "png", "jpeg"];
      const fileType = file.name.split(".")[1].toLowerCase();

      if (!isFileSupported(fileType, supportedType)) {
        return res.status(400).json({
          success: false,
          message: "File format is not supported",
        });
      }

      const response = await uploadFileToCloudinary(file, "charApp");
      updateData.image = response.secure_url;

      
    }

    const character = await Character.findByIdAndUpdate(id, updateData, { new: true });

    if (!character) {
      return res.status(404).json({
        success: false,
        message: "Character not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Character updated successfully",
      data: character,
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
