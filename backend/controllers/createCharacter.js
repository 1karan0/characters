const Character = require("../models/characterModel");

exports.createCharacter = async (req, res) => {
  try {
    const { name, title, shortdescription, fulldescription, univers } =
      req.body;
    const image = req.file ? req.file.filename : null;
    // check if all fields are present
    if (
      !name ||
      !title ||
      !shortdescription ||
      !fulldescription ||
      !image ||
      !univers
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const character = await Character.create({
      name,
      title,
      shortdescription,
      fulldescription,
      image,
      univers,
    });
    res.status(200).json({
      success: true,
      message: "Character created successfully",
      data: character,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
