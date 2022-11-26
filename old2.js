function main(datasetId = "my_dataset", tableId = "my_table") {
  // [START bigquery_get_table]
  // Import the Google Cloud client library
  const { BigQuery } = require("@google-cloud/bigquery");
  const bigquery = new BigQuery();
  // const D3Node = require('d3-node')
  // const d3n = new D3Node()      // initializes D3 with container element
  const d3 = require("d3-node")().d3;
  const d3nBar = require("d3node-barchart");
  const d3nLine = require("d3node-linechart");
  const output = require("d3node-output");
  const { writeToPath } = require("@fast-csv/format");
  const fs = require("fs");

  async function getTable() {
    // Retrieves table named "my_table" in "my_dataset".

    /**
     * TODO(developer): Uncomment the following lines before running the sample
     */
    const projectId = "starry-argon-368412";
    const datasetId = "fillers";
    const tableId = "predictions_mock_isac2";

    // Retrieve table reference
    const dataset = bigquery.dataset(datasetId);
    const [table] = await dataset.table(tableId).get();

    const sqlQuery = `SELECT timestamp as key, sentiment as value
        FROM \`${projectId}.${datasetId}.${tableId}\` order by key asc`;

    const options = {
      query: sqlQuery,
      // Location must match that of the dataset(s) referenced in the query.
    };

    const [rows] = await bigquery.query(options);
    console.log("Table:");
    //console.log(table.getRows());
    console.log(rows);
    // for (let i = 0; i < rows.length; i++){
    //   timestamps[i] = rows[i]['timestamp']
    //   sentiments[i] = rows[i]['sentiment']
    // }
    // console.log(timestamps);
    //data = d3.json(rows)
    //console.log(typeof data)
    // const path = `data/bardata.csv`;
    // //const data = [{ name: 'Stevie', id: 10 }, { name: 'Ray', id: 20 }];
    // const options2 = { headers: true, quoteColumns: true };

    // writeToPath(path, rows, options)
    //   .on("error", (err) => console.error(err))
    //   .on("finish", () => console.log("Done writing."));

    // const csvString = fs.readFileSync("data/bardata.csv").toString();
    // const data = d3.csvParse(csvString);
    //output('./output/sentimentbar', d3nBar({ data: data }));
    output("output/sentimentline", d3nLine({ data: rows }));
  }
  getTable();
  // [END bigquery_get_table]
}
main(...process.argv.slice(2));
