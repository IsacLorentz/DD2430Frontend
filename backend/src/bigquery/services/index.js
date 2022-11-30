const db = require("./db");

async function getData() {
  const sqlQuery = `
    SELECT principal_component_1, principal_component_2, CENTROID_ID
    FROM \`news.predictions_with_centroids\`
  `;

  const [rows] = await db.runSql(sqlQuery);

  return rows;
}

async function getSentimentOverTime(requestQuery) {
  if (!requestQuery.hasOwnProperty("fromDate")) requestQuery["fromDate"] = 0;

  if (!requestQuery.hasOwnProperty("toDate"))
    requestQuery["toDate"] = new Date();

  if (!requestQuery.hasOwnProperty("timeUnit"))
    throw Error("Query did not have timeUnit");

  const fromUnixEpoch = parseInt(requestQuery.fromDate);
  const toUnixEpoch = parseInt(requestQuery.toDate);

  var timeUnitUnixEpoch = -1;

  switch (requestQuery.timeUnit) {
    case "month":
      timeUnitUnixEpoch = 2628000;
      break;
    case "week":
      timeUnitUnixEpoch = 604800;
      break;
    case "day":
      timeUnitUnixEpoch = 86400;
      break;
    default:
      throw Error("timeUnit is not valid.");
  }

  const sqlQuery = `
    SELECT AVG(sentiment) as sentiment, bucket
    FROM (
      SELECT (case when sentiment = 'POSITIVE' then 1 else -1 end) as sentiment, TIMESTAMP_SECONDS(CAST(timestamp AS INT64)) as time, floor(timestamp/${timeUnitUnixEpoch}) as bucket
      FROM \`news.predictions_with_centroids\`
      WHERE timestamp > ${fromUnixEpoch} AND timestamp < ${toUnixEpoch}
    )
    GROUP BY bucket
    ORDER BY bucket
  `;

  const [rows] = await db.runSql(sqlQuery);

  return rows;
}

async function createNewTopicClusters(requestQuery) {
  if (!requestQuery.hasOwnProperty("numberOfClusters"))
    throw Error("Query did not have numberOfClusters");

  // Train new K-means model
  var sqlQuery = `
    CREATE OR REPLACE MODEL \`news.kmeans\`
    OPTIONS (
      MODEL_TYPE="KMEANS",
      NUM_CLUSTERS=${requestQuery.numberOfClusters}
    ) AS
    (
      SELECT principal_component_1, principal_component_2
      FROM \`news.predictions_with_centroids\`
    )
  `;

  await db.runSql(sqlQuery);

  sqlQuery = `
    CREATE OR REPLACE TABLE news.predictions_with_centroids AS
    SELECT CENTROID_ID, principal_component_1, principal_component_2, url, text, timestamp, sentiment
    FROM ML.PREDICT(MODEL news.kmeans, (
      SELECT principal_component_1, principal_component_2, url, text, timestamp, sentiment
      FROM \`news.predictions_with_centroids\`
    ))
  `;

  await db.runSql(sqlQuery);
}

async function getNumberOfClusters() {
  const sqlQuery = `
    SELECT COUNT(DISTINCT(CENTROID_ID)) as count
    FROM \`news.predictions_with_centroids\`
  `;

  const [rows] = await db.runSql(sqlQuery);

  return rows[0].count;
}

module.exports = {
  getData,
  getSentimentOverTime,
  createNewTopicClusters,
  getNumberOfClusters,
};
