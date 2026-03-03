const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    externalId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    category: {
      type: String,
    },
    jobType: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Job", jobSchema);