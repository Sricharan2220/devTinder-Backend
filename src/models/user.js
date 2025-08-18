const mongoose = require('mongoose');
const validator = require('validator');
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
                throw new err("Invalid Email Address: " + value);
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
            if(!["male","female","others"].includes(value.lowercase)){
                throw new err("Gender is not valid");
            }
        }
    },
    about:{
        type: String,
        default: "This is the default about the user"
    },
    photoUrl: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fopenclipart.org%2Fdetail%2F346569%2Fdefault-silhouette-avatar&psig=AOvVaw1Yde2fWb5S52S-G3B54rRo&ust=1755602220997000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNCk14melI8DFQAAAAAdAAAAABAE",
        validate(value){
            if(!validator.isURL(value)){
                throw new err("Invalid Photo URL: " + value);
            }
        }
    },
    skills:{
        type: [String],
        maxlength: 20
    }
},
{timestamps: true});

module.exports = mongoose.model("User",userSchema);