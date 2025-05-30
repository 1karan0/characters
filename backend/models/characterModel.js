const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  shortdescription: {
    type: String,
    required: true,
  },
  fulldescription: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  univers: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"univers"
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Character", characterSchema);
