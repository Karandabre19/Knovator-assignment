const IORedis = require("ioredis");

const connection = new IORedis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null,
});

connection.on("connect", () => {
  console.log("Redis connected successfully");
});

connection.on("error", (err) => {
  console.log("Redis err", err);
});

module.exports = connection;