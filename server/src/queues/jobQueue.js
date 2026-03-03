const { Queue } = require("bullmq");
const connection = require("../config/redis");

const jobQueue = new Queue("job-import-queue", {
  connection,
  defaultJobOptions: {
    attempt: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

module.exports = jobQueue;
