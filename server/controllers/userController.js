// Creating functions that serves endpoints
const Users = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.getUser = catchAsync(async (req, res) =>{
    const {id} = req.body;
    const user = await Users.findById(id);
    if(!user){
        return next(new AppError('There is no such user', 404))
    }
    res.status(200).json({
        status:'succes',
        data:{
            user          
        }
    })
})
exports.getAllUsers = catchAsync( async (req, res) => {
    const allUsers = await Users.find();
    res.status(200).json({
        status:'succes',
        results: allUsers.length,
        data:{
            allUsers
        }
    })
})

