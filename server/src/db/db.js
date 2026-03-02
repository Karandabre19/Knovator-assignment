const mongoose = require("mongoose");

async function connectDB(){
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Connected to the MongoDB");
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = connectDB;