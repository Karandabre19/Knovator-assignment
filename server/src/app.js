const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// const Job = require("./models/job.module");
// const jobQueue = require("./queues/jobQueue");
// const { fetchAndParseJobs } = require("./service/jobFetch.service");
// const { default: mongoose } = require("mongoose");
// const importRunModule = require("./models/importRun.module");
const importRoute = require("./routes/import.route");


const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Import route implement here

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.options(/.*/, cors());


app.use("/api", importRoute);



app.get("/", async (req, res) => {
  res.send("started the Job importing machine");
});


module.exports = app;



// app.get("/test-job", async (req, res) => {
//   try {
//     const job = await Job.create({
//       externalId: "test-123",
//       title: "Test Job",
//     });

//     res.send(job);
//   } catch (err) {
//     console.error("Failed to create test job:", err.message);
//     res.status(500).json({
//       message: "Failed to create test job",
//       error: err.message,
//     });
//   }
// });

// app.get("/test-queue", async (req, res) => {
//   await jobQueue.add("import-batch", {
//     source: "manual-test",
//     jobs: [
//       { externalId: "1", title: "Dev 1" },
//       { externalId: "2", title: "Dev 2" },
//       { externalId: "3", title: "Dev 3" },
//     ],
//   });

//   res.send("Batch added");
// });


// app.get("/import-feed", async (req, res) => {
//   const url = "https://jobicy.com/?feed=job_feed";

//   const jobs = await fetchAndParseJobs(url);
//   const batchSize = parseInt(process.env.BATCH_SIZE) || 1000;

//   const runId = new mongoose.Types.ObjectId().toString();
//   const totalBatches = Math.ceil(jobs.length / batchSize);

//   await importRunModule.create({
//     runId,
//     source: url,
//     totalFetched: jobs.length,
//     totalBatches,
//   });

//   for (let i = 0; i < jobs.length; i += batchSize) {
//     const batch = jobs.slice(i, i + batchSize);

//     await jobQueue.add("import-batch", {
//       runId,
//       source: url,
//       jobs: batch,
//     });
//   }

//   res.json({
//     message: "Feed queued successfully",
//     total: jobs.length,
//     runId,
//   });
// });
