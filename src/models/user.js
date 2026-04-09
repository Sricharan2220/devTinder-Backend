const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: true,
        minlength: 3
    },
    lastName: {
        type: String,
        minlength: 3
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address: " + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new err("Enter Strong Password: " + value);
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others",""].includes(value.toLowerCase())){
                throw new Error("Gender is not valid");
            }
        }
    },
    about:{
        type: String,
        default: "This is the default about the user",
        maxlength: 180
    },
    photoUrl: {
        type: String,
        default: "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new err("Invalid Photo URL: " + value);
            }
        }
    },
    skills:{
        type: [String],
        validate(value){
            if(value.length > 10){
                throw new Error("Skills cannot be more than 10");
            }
        }
    }
},
{timestamps: true});


userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id : user._id},"DEV@Tinder$790",{
        expiresIn: "1d"
    });
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,this.password);
    return isPasswordValid;
}
module.exports = mongoose.model("User",userSchema);