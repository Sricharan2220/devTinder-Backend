const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://kschrn2220:MongoDB;;12@cluster0.cu9ni8y.mongodb.net/devTinder");
};

module.exports = connectDB
