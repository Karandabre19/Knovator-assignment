require("dotenv").config({
  debug: true,
});

const app = require("./src/app");
const connectDB = require("./src/db/db");

const PORT = process.env.PORT || 5021;

async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}...`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
}

startServer();
