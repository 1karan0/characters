const Character = require("../models/characterModel");
const Univers = require('../models/UniversModel')

exports.getAllCharacters = async (req, res) => {
  try {
    // const { univers } = req.params;
    const characters = await Character.find().populate("univers");
    if(!characters || characters.length === 0){
      return res.status(404).json({
        success: false,
        message: " character not found ",
      });
    }
     res.json({
      success: true,
      message: "All characters fetched successfully",
      data: characters,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.getCharById = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await Character.findById(id).populate("univers");
    if(!character){
      res.status(201).json({
        success: false,
        message: "No character found with this id",
      })
    }
    res.status(200).json({
      success: true,
      message: "character fetched successfully",
      data: character,
    });
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "cant find the character with this id",
      error: err.message,
    });
  }
};
