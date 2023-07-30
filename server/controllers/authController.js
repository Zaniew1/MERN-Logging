const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const crypto = require('crypto')

exports.forgetPassword = catchAsync( async (req, res, next)=>{
    // find an account with that email
    const user = await Users.findOne({email:req.body.email})
    // check if this account exists
    if(!user) return next( console.log('error'))

    const resetToken = user.createPasswordResetToken();
    // we turn off any validation in UserSchema
    await user.save({validateBeforeSave: false});
    const resetURL = `${req.protocol}://${req.get('host')}/resetPassword}`;
    const message = `Forgot your password ? Go to : ${resetToken} `;
    try{

        await sendEmail({
            email: user.email,
            subject: 'Yur password reset token (valid for 10 min)',
            message
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
        return next()
    }
});

exports.resetPassword = catchAsync(async (req, res, next) =>{
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user =  await Users.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt:Date.now()}})
    if(!user) return next(console.log('żle'))
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