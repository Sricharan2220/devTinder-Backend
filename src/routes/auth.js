const express = require('express');
const {validateSignUp} = require('../utils/validations');
const User = require("../models/user");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

authRouter.post("/signup",async (req,res)=>{
    try{
        // Validate the Data
        validateSignUp(req);

        const {firstName,lastName,emailId,password} = req.body;

        const existingUser = await User.findOne({emailId : emailId});
        if(existingUser){
            throw new Error("User with this Email already Exists, Please Login");
        }
        // encrypt the password
        const passwordHash = await bcrypt.hash(password,10);
        
        const userData = {
            firstName,
            lastName,
            emailId,
            password: passwordHash
        };

        // Optional fields
        if (req.body.skills) userData.skills = req.body.skills;
        if (req.body.photoUrl) userData.photoUrl = req.body.photoUrl;
        if (req.body.about) userData.about = req.body.about;
        if(req.body.age) userData.age = req.body.age;
        if(req.body.gender) userData.gender = req.body.gender

        const user = new User(userData);

        const savedUser = await user.save();
        const token = await savedUser.getJWT();

        res.cookie("token",token,{
            expires: new Date(Date.now() + 8 * 3600000)
        });
        
        res.send({message : "User Registered Successfully", data: savedUser});
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});


authRouter.post("/login",async (req,res)=>{
    try{
      const {emailId,password} = req.body;

      const user = await User.findOne({emailId});
      if(!user){
        throw new Error("Invalid Credentials");
      }
      
      const isPasswordValid = await user.validatePassword(password);
      if(isPasswordValid){
        const token = await user.getJWT();

        res.cookie("token",token,{
            expires: new Date(Date.now() + 8 * 3600000)
        });
        
        res.send(user);
      }else{
        throw new Error("Invalid Credentials");
      }

    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});


authRouter.post("/logout",(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now())
    })
    res.send("Logout succesful");
})
module.exports = authRouter;