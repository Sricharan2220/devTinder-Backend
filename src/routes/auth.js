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

        // encrypt the password
        const passwordHash = await bcrypt.hash(password,10);
        
        const user = new User({
            firstName,lastName,emailId,password: passwordHash,
        });

        user.save();
        res.send("User saved Successfully");
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
        
        res.send("Login Successful");
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