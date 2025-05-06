const Univers = require('../models/UniversModel')
const Character = require('../models/characterModel')
const User = require('../models/userModel');

exports.CreateUnivers = async (req,res) =>{
    try{
        const {univers} = req.body;
        if(!univers){
            return res.status(400).json({
                success:false,
                message:"Univers name is required"
            })
        }
        const existingUni = await Univers.findOne({univers});
        if(existingUni){
            return res.status(409).json({
                success:false,
                message:"univers already exist"
            })
        }

        const response = await Univers.create({univers});
        res.status(200).json({
            success:true,
            message:"univers created successfully",
            data:response
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"internal server error in creating univers",
            error:err.message
        });
    }
};

exports.getUnivers = async (req,res)=>{
    try{
        const univers = await Univers.find();
        if(!univers || univers.length === 0){
            return res.status(404).json({
                success:false,
                message:"cant find the univers"

            })
        }
        res.status(200).json({
            success:true,
            message:"univers fecthed successfully",
            data:univers
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"internal server error in fetching univers",
            error:err.message
        })
    }
}