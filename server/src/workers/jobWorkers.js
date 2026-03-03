const { Worker } = require("bullmq");
const connection = require("../config/redis");
const ImportRun = require("../models/importRun.module");
const ImportLog = require("../models/import.module");
const jobImportService = require("../service/jobImport.service");

const worker = new Worker(
  "job-import-queue",
  async (job) => {
    const { runId } = job.data;

    console.log("worker recieved the job data", job.data);

    const result = await jobImportService.processJobs(job.data);

    const { newJobs, updatedJobs, failedJobsCount } = result;

    // Increment run stats
    await ImportRun.updateOne(
      { runId },
      {
        $inc: {
          newJobs,
          updatedJobs,
          failedJobs: failedJobsCount,
          processedBatches: 1,
        },
      }
    );

    // Check if this was last batch
    const run = await ImportRun.findOne({ runId });

    if (run.processedBatches === run.totalBatches) {
      console.log("You have reached here");
      console.log("processedBatches", run?.processedBatches);
      console.log("totalBatches", run?.totalBatches);
      try {
        const log = await ImportLog.create({
          fileName: run.source,
          totalFetched: run.totalFetched,
          totalImported: run.newJobs + run.updatedJobs,
          newJobs: run.newJobs,
          updatedJobs: run.updatedJobs,
          failedJobs: run.failedJobs,
        });

      console.log("ImportLog created:", log._id);

      await ImportRun.deleteOne({ runId });

      console.log("Final ImportLog created for run:", runId);
      } catch (error) {
        console.log("Error while creating the import log", error);
      }
    }
  },
  {
    connection,
    concurrency: parseInt(process.env.WORKER_CONCURRENCY) || 5,
  }
);