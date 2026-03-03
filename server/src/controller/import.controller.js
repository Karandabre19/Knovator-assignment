const mongoose = require("mongoose");
const ImportRun = require("../models/importRun.module");
const ImportLog = require("../models/import.module");
const jobQueue = require("../queues/jobQueue");
const { fetchAndParseJobs } = require("../service/jobFetch.service");

const triggerImport = async (req, res) => {
  try {
    const url = "https://jobicy.com/?feed=job_feed&job_categories=data-science";

    const jobs = await fetchAndParseJobs(url);
    const batchSize = parseInt(process.env.BATCH_SIZE) || 1000;

    const runId = new mongoose.Types.ObjectId().toString();
    const totalBatches = Math.ceil(jobs.length / batchSize);

    await ImportRun.create({
      runId,
      source: url,
      totalFetched: jobs.length,
      totalBatches,
    });

    for (let i = 0; i < jobs.length; i += batchSize) {
      const batch = jobs.slice(i, i + batchSize);

      await jobQueue.add("import-batch", {
        runId,
        source: url,
        jobs: batch,
      });
    }

    res.json({
      message: "Import queued successfully",
      total: jobs.length,
      runId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Import failed" });
  }
};

const getImportLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const logs = await ImportLog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ImportLog.countDocuments();

    res.json({
      data: logs,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};

module.exports = {
  triggerImport,
  getImportLogs,
};