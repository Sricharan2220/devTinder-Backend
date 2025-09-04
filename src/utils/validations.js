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

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  
  if(!isEditAllowed){return false;}


  if (req.body.skills) {
    if (req.body.skills.length > 10){
        throw new Error("Skills cannot be more than 10")
    }    
  }

  // photoUrl: must be valid URL
  if (req.body.photoUrl) {
    try {
      new URL(req.body.photoUrl); // will throw if invalid
    } catch (err) {
       throw new Error("Invalid photo URL");
    }
  }

  // age: must be number
  if (req.body.age && typeof req.body.age !== "number") {
    throw new Error("Age should be a number");
  }
  
  return true;
};

module.exports = {validateSignUp,validateEditProfileData}