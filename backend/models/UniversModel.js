const mongoose = require('mongoose')

const UniversSchema = new mongoose.Schema({
    univers:{
        type:String,
        required:true,
        unique: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
      },

});

module.exports=mongoose.model("univers",UniversSchema);