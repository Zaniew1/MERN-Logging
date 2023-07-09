// Creating functions that serves endpoints
const Users = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try{
        const allUsers = await Users.find();
        console.log(allUsers);
        res.status(200).json({
            status:'succes',
            results: allUsers.length,
            data:{
                allUsers
            }
        })
    }catch(err){
        console.log(err)
    }
}
exports.createNewUser = async (req, res) => {
    try{
        
        const user = req.body;
        console.log(user)
        const newUser = new Users(user);
        await newUser.save();
    }catch(err){
        console.log(err)
    }
}