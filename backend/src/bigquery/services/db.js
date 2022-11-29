const { BigQuery } = require("@google-cloud/bigquery");

async function runSql(sql) {
  const bigqueryClient = new BigQuery();

  const options = {
    query: sql,
    location: "EU",
  };

  return await bigqueryClient.query(options);
}

module.exports = {
  runSql,
};
