
// WE are creating a schema to given collection in database
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

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
    } 
});



UserSchema.methods.comparePasswords = async function( typedPassword, databasePassword){
    return await bcrypt.compare(typedPassword, databasePassword);
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


const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;