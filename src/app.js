const express = require("express");
const connectDB = require("./config/database");
const app = express();


connectDB().then(()=>{
    console.log("Database Connection Established....");
    app.listen(3000,()=>{
        console.log(`Server running on port 3000`);
    });
}).catch((err)=>{
    console.error("Database cannot be connected");
})
