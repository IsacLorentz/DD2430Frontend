const db = require("./db");

async function getData() {
  const sqlQuery = `
    SELECT principal_component_1, principal_component_2, CENTROID_ID
    FROM \`news.predictions_with_centroids\`
  `;

  const [rows] = await db.runSql(sqlQuery);

  return rows;
}

module.exports = {
  getData,
};
