const mongoose =require( "mongoose" );
const  userSchema =require("../model/userModel")
require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = mongoose.model('user', userSchema)
const userMiddleware = async (req, res, next) => {
    console.log('User middleware called');
    const token = req.cookies.token;

    // Verify the token
    jwt.verify(token, process.env.secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = decoded;
      next()
    })
    // const existingUser = await User.findOne({email: req.body.email})
    // if(existingUser){
    // next()
    // }
    // else{
    //     res.send("Authentication error")
    // }
  };
  
module.exports = userMiddleware