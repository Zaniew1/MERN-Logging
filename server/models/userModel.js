
// WE are creating a schema to given collection in database

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;