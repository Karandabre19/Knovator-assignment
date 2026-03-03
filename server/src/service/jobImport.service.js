const Job = require("../models/job.module");
const ImportRun = require("../models/importRun.module");

async function processJobs(data) {
  const { jobs, source } = data;
  let newJobs = 0;
  let updatedJobs = 0;
  let failedJobsCount = 0;

  for (const job of jobs) {
    try {
      // Check if job already exists by externalId
      const existingJob = await Job.findOne({ externalId: job.externalId });

      if (existingJob) {
        // Update existing job
        await Job.updateOne(
          { externalId: job.externalId },
          {
            $set: {
              title: job.title,
              company: job.company,
              description: job.description,
              location: job.location,
              category: job.category,
              jobType: job.jobType,
              url: job.url,
              updatedAt: new Date(),
            },
          }
        );
        updatedJobs++;
      } else {
        // Create new job
        await Job.create({
          externalId: job.externalId,
          title: job.title,
          company: job.company,
          description: job.description,
          location: job.location,
          category: job.category,
          jobType: job.jobType,
          url: job.url,
        });
        newJobs++;
      }
    } catch (error) {
      console.error("Error processing job:", error);
      failedJobsCount++;
    }
  }

  return {
    newJobs,
    updatedJobs,
    failedJobsCount: failedJobsCount || 0,
  };
}

module.exports = {
  processJobs,
};
