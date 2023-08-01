
// We are creating a schema to given collection in database
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlenght: 8,
    },
    confirmPassword:{
        type: String,
        required: true,
        select: false ,
        validate:{
            validator: function(el){
                return el === this.password; 
            },
            message: "Password are not the same"
        },
        minlenght: 8,
    },
    creationDate:{
       default: (new Date().getTime()),
       type: Number,
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    }
});



UserSchema.methods.comparePasswords = async function( typedPassword, databasePassword){
    // this function compares two passwords, one password is hashed, one is not,
    // comparizon is made by hashing first password and then comparing both hashed passwords
    return await bcrypt.compare(typedPassword, databasePassword);
}
UserSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

// this middleware wil fire off just before save and only if password changes
UserSchema.pre('save' , async function(next){
    // isModified is mongoose function
    if(!this.isModified('password')) return next();
    // 12 value stands for how strong encryption will be
     this.password = await bcrypt.hash(this.password, 12); 
     this.confirmPassword = undefined;
    next(); 
})
UserSchema.pre('save', function(next){
    if(!this.isModified('password') || this.isNew ) return next();
    this.passwordChangedAt = Date.now() -1000;
    next();
})

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;