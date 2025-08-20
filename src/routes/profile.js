const express = require("express");
const {userAuth} = require("../middlewares/userAuth");
const profileRouter = express.Router();

profileRouter.get("/profile/view",userAuth,(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

profileRouter.patch("/profile/edit",userAuth,(req,res)=>{
    
})
module.exports = profileRouter;