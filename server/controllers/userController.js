// Creating functions that serves endpoints
const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');



const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


exports.getUser = async (req, res) =>{
    try{
        const {id} = req.body;
        const user = await Users.findById(id);
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
exports.getAllUsers = async (req, res) => {
    try{
        const allUsers = await Users.find();
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

exports.loginUser = async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        console.log('zjebałeś');
        return
    }
    if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
        console.log('zjebałeś')
        return
    }
    const user = await Users.findOne({email}).select('+password');
    if(!user || !user.comparePasswords(password, user.password)){
        return next(new Error('gówno'))
    }
    const token = signToken(user._id);
    console.log('zalogowałeś się ')
    res.status(200).json({
        status: "success",
        token
    })
}

exports.createNewUser = async (req, res) => {
    try{
        const {username, email, password, confirmPassword} = req.body;
        if(!email || !password){
            console.log('zjebałeś 1');
            return;
        }
        if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
            console.log('zjebałeś 2');
            return;
        }
        if(password !== confirmPassword){
            console.log('zjebałeś 3');
            return;
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

    }catch(err){
        console.log(err)
    }
}