const jobQueue = require("./src/queues/jobQueue");
require("dotenv").config({
  debug: true,
});

const app = require("./src/app");
const connectDB = require("./src/db/db");
require("./src/cron/import.cron")
require("./src/workers/jobWorkers.js");

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

app.get("/test-queue", async (req, res) => {
  await jobQueue.add("import-batch", {
    jobs: [
      { externalId: "1", title: "Dev 1" },
      { externalId: "2", title: "Dev 2" },
    ],
  });

  res.send("Test batch added to queue");
});
