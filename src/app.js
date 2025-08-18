const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
app.use(express.json());


app.post("/signup",(req,res)=>{
    const user = new User(req.body);

    try{
        user.save();
        res.send("User saved Successfully");
    }catch(err){
        res.status(400).send("Error saving the User:" + err.message);
    }
})




connectDB().then(()=>{
    console.log("Database Connection Established....");
    app.listen(3000,()=>{
        console.log(`Server running on port 3000`);
    });
}).catch((err)=>{
    console.error("Database cannot be connected");
})
