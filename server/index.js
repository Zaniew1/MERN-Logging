// Main file in which we create server
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
// const UserModel = require('./models/UserModel');
const userRouter = require ('./routes/userRoutes');
const cors = require('cors');


// We are creating connection with MongoDB Atlas
mongoose.connect(`${process.env.MONGO_DB_PASS}`);
//We allow sending JSON from frontend to backend
app.use(express.json());
// We eliminate a lot of errors
app.use(cors());
app.options('*', cors());
// Creating an endpoint

app.use('/', userRouter);

// Creating server
app.listen(3001, ()=>{
    console.log("Server runs good !")
})
