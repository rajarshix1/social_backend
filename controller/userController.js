const mongoose =require( "mongoose" );
const  userSchema =require("../model/userModel")
const jwt = require('jsonwebtoken')
const User = mongoose.model('user', userSchema)
require('dotenv').config()

const newUser = async (req, res) => {
    let newC = new User(req.body)
   try {
    const existingUser = await User.findOne({email: req.body.email})
    console.log(existingUser);
    if(!existingUser){
    const resp = await newC.save()
    res.json(resp)}
    else{
        res.send("Email already exists")
    }
   } catch (error) {
    console.log(error);
    res.json(error)
   }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    // Check if the password is correct
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    // Generate a JWT token with the user ID and email as payload
    const token = jwt.sign({ id: user._id, email: user.email , name:user.name}, process.env.secretKey, { expiresIn: '1d' });
  
    // Send the JWT token as a response
    res.cookie('token', token, { httpOnly: true, maxAge: 24*3600000, path: '/' });
    user.password = undefined
    res.send(user)
  } catch (error) {
    res.send('error')
    console.log(error);
  }
  }
const getAllUsers = (req, res) => {
    User.find({}, (err, success)=>{
        if (err) {
            res.send(err)
        }
        else{
            res.json(success)
        }
    })
    
}
const getUserbyId = (req, res) => {
    console.log(req.params.UserId);
    User.findById(req.params.UserId, (err, success)=>{
        if (err) {
            res.send(err)
        }
        else{
            res.json(success)
        }
    })
    
}
const updateUser= (req, res) => {
    console.log(req.params.UserId);
    const id = req.body.UserId
    const updatedInfo = req.body
    updatedInfo.UserId = undefined
    User.findByIdAndUpdate(id, updatedInfo, {new:true}, (err, success)=>{
        if (err) {
            res.send(err)
        }
        else{
            res.json(success)
        }
    })
    
}
const deleteUser= (req, res) => {
    console.log(req.body.UserId);
    User.remove({_id: req.body.UserId}, (err, success)=>{
        if (err) {
            res.send(err)
        }
        else{
            res.json({"message": "success"})
        }
    })
    
}
module.exports={newUser, getAllUsers, getUserbyId, updateUser, deleteUser, login}