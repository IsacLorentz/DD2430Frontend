function main() {
  const { BigQuery } = require("@google-cloud/bigquery");
  const bigquery = new BigQuery();
  const d3nLine = require("d3node-linechart");
  const output = require("d3node-output");

  async function getTable() {
    const projectId = "starry-argon-368412";
    const datasetId = "news";
    const tableId = "predictions";

    const dailyQuery = `with
      sentimentScores as (
        SELECT 
          extract(dayofyear from timestamp_seconds(cast(timestamp as int64))) as dayofyear, 
          sentiment, cast(timestamp as int64) as intval,
          case sentiment
            when 'POSITIVE' then score
            else -1*score
            end
            as sentimentscore
            FROM \`${projectId}.${datasetId}.${tableId}\` order by dayofyear asc)
    select dayofyear as key, avg(sentimentscore) as value from sentimentScores group by dayofyear order by dayofyear asc 
            `;

    const weeklyQuery = `with
      sentimentScores as (
        SELECT 
          extract(week from timestamp_seconds(cast(timestamp as int64))) as week, 
          sentiment, cast(timestamp as int64) as intval,
          case sentiment
            when 'POSITIVE' then score
            else -1*score
            end
            as sentimentscore
            FROM \`${projectId}.${datasetId}.${tableId}\` order by week asc)
    select week as key, avg(sentimentscore) as value from sentimentScores group by week order by week asc 
            `;

    const monthlyQuery = `with
      sentimentScores as (
        SELECT 
          extract(month from timestamp_seconds(cast(timestamp as int64))) as month, 
          sentiment, cast(timestamp as int64) as intval,
          case sentiment
            when 'POSITIVE' then score
            else -1*score
            end
            as sentimentscore
            FROM \`${projectId}.${datasetId}.${tableId}\` order by month asc)
    select month as key, avg(sentimentscore) as value from sentimentScores group by month order by month asc 
            `;

    const dailyOptions = {
      query: dailyQuery,
    };

    const weeklyOptions = {
      query: weeklyQuery,
    };

    const monthlyOptions = {
      query: monthlyQuery,
    };

    const [daily] = await bigquery.query(dailyOptions);
    const [weekly] = await bigquery.query(weeklyOptions);
    const [monthly] = await bigquery.query(monthlyOptions);

    dailyContainer =
      '<div id="container"><h2>Daily average sentiment (day of year)</h2><div id="chart"></div></div>';
    weeklyContainer =
      '<div id="container"><h2>Weekly average sentiment</h2><div id="chart"></div></div>';
    monthlyContainer =
      '<div id="container"><h2>Monthly average sentiment (month number)</h2><div id="chart"></div></div>';

    output(
      "output/sentimentdaily",
      d3nLine({ data: daily, container: dailyContainer })
    );
    output(
      "output/sentimentweekly",
      d3nLine({ data: weekly, container: weeklyContainer })
    );
    output(
      "output/sentimentmonthly",
      d3nLine({ data: monthly, container: monthlyContainer })
    );
  }
  getTable();
}
main(...process.argv.slice(2));
