const mongoose = require("mongoose");

async function connectDB(){
    try {
        const uri = process.env.DB_URI;

        if (!uri) {
            throw new Error("DB_URI is missing in environment variables.");
        }
        await mongoose.connect(uri);
        console.log("Connected to the MongoDB");
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = connectDB;
