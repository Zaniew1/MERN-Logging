// Creating functions that serves endpoints
const Users = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try{
        const allUsers = await Users.find();
        console.log(allUsers)
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

exports.loginUser = (req, res)=>{
    const {email, password} = req.body;
    console.log(email)
    console.log(password)

}

exports.createNewUser = async (req, res) => {
    try{
        const {username, email, password, confirmPassword} = req.body;
        if(password !== confirmPassword){
            console.log('zjebałeś')
        }
        else{
            const newUser = new Users({
                username, 
                email,
                password,
                confirmPassword
            });
            await newUser.save();
            res.status(200).json({
                status:'succes',
                newUser
            })

        }
    }catch(err){
        console.log(err)
    }
}