const Character = require('../models/characterModel');

exports.deleteCharacter = async (req,res)=>{
    try{
        const {id} = req.params;
        // check if id is present
        if(!id){
            return res.status(400).json({
                success:false,
                message: 'Please provide an id'
            });
        }
        // check if character exists
        const character = await Character.findById(id);
        if(!character){
            return res.status(404).json({
                success:false,
                message: 'Character not found'
            });
        }
        // delete character
        await Character.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message: 'Character deleted successfully',
            data:character
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message: 'Internal server error'
        
        });
    }
}