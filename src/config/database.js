const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["1.1.1.1","8.8.8.8"]);

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/devTinder");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        throw error;
    }
};

module.exports = connectDB
