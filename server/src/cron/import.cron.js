const cron = require("node-cron");
const jobQueue = require("../queues/jobQueue");
const ImportRun = require("../models/importRun.module");
const { fetchAndParseJobs } = require("../service/jobFetch.service");

const FEED_URLS = [
  "https://jobicy.com/?feed=job_feed",
  "https://jobicy.com/?feed=job_feed&job_categories=data-science",
];

cron.schedule("0 * * * *", async () => {
  console.log("Running scheduled import...");

  for (const url of FEED_URLS) {
    const jobs = await fetchAndParseJobs(url);
    const batchSize = parseInt(process.env.BATCH_SIZE) || 1000;
    const totalBatches = Math.ceil(jobs.length / batchSize);

    // Create ImportRun record
    const runId = `run_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    await ImportRun.create({
      runId,
      source: url,
      totalFetched: jobs.length,
      totalBatches,
      processedBatches: 0,
      newJobs: 0,
      updatedJobs: 0,
      failedJobs: 0,
    });

    for (let i = 0; i < jobs.length; i += batchSize) {
      const batch = jobs.slice(i, i + batchSize);

      await jobQueue.add("import-batch", {
        runId,
        source: url,
        jobs: batch,
      });
    }
  }
});

console.log("Cron scheduled for every hour");
