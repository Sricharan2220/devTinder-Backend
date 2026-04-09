const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["1.1.1.1","8.8.8.8"]);

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://kschrn2220:mSV6@QAc75VM@m.@cluster0.at5rqca.mongodb.net/?appName=devTinder");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        throw error;
    }
};

module.exports = connectDB
