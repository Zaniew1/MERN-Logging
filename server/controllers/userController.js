// Creating functions that serves endpoints
const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// const crypto = require('crypto')


// const signToken = id => {
//     return jwt.sign({id}, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN
//     })
// }


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




exports.loginUser = catchAsync(async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return next(new AppError('There have to be email and password', 400));
        
    }
    if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
        return next(new AppError('Password needs to contain min. 8 letters, 1 big, 1 small letter and 1 special character', 400));
        
    }
    const user = await Users.findOne({email}).select('+password');
    if(!user || !user.comparePasswords(password, user.password)){
        return next(new AppError("Password is incorrect",400))
    }
    const token = signToken(user._id);
    res.status(200).json({
        status: "success",
        token
    })
    // res.redirect('/Home');
})

exports.createNewUser = catchAsync( async (req, res) => {
        const {username, email, password, confirmPassword} = req.body;
        if(!email || !password){
            return next(new AppError('There have to be email and password', 400));
        }
        if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
            return next(new AppError('Password needs to contain min. 8 letters, 1 big letter, 1 small letter and 1 special character', 400));
        }
        if(password !== confirmPassword){
            return next(new AppError("Passwords are not the same", 400));
        }
            const newUser = await Users.create({
                username, 
                email,
                password,
                confirmPassword,
            });
            // we create a token by giving it user id we just created , and secret key  created by us and stored in .env file
            // we also set algorithm and expire date after which token will become useless
            const token = signToken(newUser._id);
            res.status(201).json({
                status:'success',
                token,
                data:{
                    newUser
                }
            })

   
})