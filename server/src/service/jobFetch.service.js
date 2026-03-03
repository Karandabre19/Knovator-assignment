const axios = require("axios");
const xml2js = require("xml2js");

async function fetchAndParseJobs(url) {
  const response = await axios.get(url);
  const parser = new xml2js.Parser({
    explicitArray: false,
    mergeAttrs: true,
    trim: true,
    strict: false,
  });

  const result = await parser.parseStringPromise(response.data);
  console.log(JSON.stringify(result, null, 2));

  const items = result.rss.channel.item;

  if (!items) return [];

  return items.map((item) => ({
    externalId: item.guid?._ || item.link,
    title: item.title,
    company: item["job:company"] || "Unknown",
    description: item.description,
    location: item["job:location"] || "Remote",
    category: item.category || "General",
    jobType: item["job:type"] || "Full-time",
    url: item.link,
  }));
}

module.exports = {
  fetchAndParseJobs,
};