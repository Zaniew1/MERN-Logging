const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const crypto = require('crypto');
 const sendEmail = require('../utils/email');


const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}



exports.forgetPassword = catchAsync( async (req, res, next)=>{
    // find an account with that email
    const user = await Users.findOne({email:req.body.email})
    // check if this account exists
    if(!user) return next( new AppError('User not found', 404));
    
    const resetToken = user.createPasswordResetToken();
    // we turn off any validation in UserSchema
    await user.save({validateBeforeSave: false});
    const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
    const message = `Forgot your password ? Go to : ${resetURL}.\n If you didnt then ignore that message `;
    console.log(message)
    try{

        await sendEmail({
            email: user.email,
            subject: 'Yur password reset token (valid for 10 min)',
            message:message
        })
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email !'
        })
    }
    catch(err){
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSabve : false});
        return next(new AppError('No reset token sent', 500));
    }
});

exports.resetPassword = catchAsync(async (req, res, next) =>{
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    console.log(hashedToken)
    const user =  await Users.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt:Date.now()}})
    console.log(req.body)
    if(!user) return next(new AppError('User not found', 404))
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined
    await user.save();
    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    })
})

exports.loginUser = catchAsync(async (req, res, next)=>{
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

exports.createNewUser = catchAsync( async (req, res, next) => {
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