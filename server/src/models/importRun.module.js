const mongoose = require("mongoose");

const importRunSchema = new mongoose.Schema({
  runId: { type: String, required: true, unique: true },
  source: String,
  totalFetched: Number,
  totalBatches: Number,
  processedBatches: { type: Number, default: 0 },
  newJobs: { type: Number, default: 0 },
  updatedJobs: { type: Number, default: 0 },
  failedJobs: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ImportRun", importRunSchema);