const validator = require('validator');

const validateSignUp = (req) => {
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !emailId || !password){
        throw new Error("Missing Fields");
    }
    if(!validator.isEmail(emailId.trim())){
        throw new Error("Email ID is not valid");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a Strong Password");
    }
}

module.exports = {validateSignUp}