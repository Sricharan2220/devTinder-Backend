const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["1.1.1.1","8.8.8.8"]);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_SECRET);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        throw error;
    }
};

module.exports = connectDB
