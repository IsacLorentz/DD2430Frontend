import { get, post } from "@/api";
import { BIGQUERY_URL } from "@/config";

export const getData = () => {
  return get(BIGQUERY_URL + "/data");
};

export const getTrendsOverTime = (fromDate, toDate, timeUnit, topic) => {
  return get(BIGQUERY_URL + "/trends-over-time", {
    fromDate,
    toDate,
    timeUnit,
    topic,
  });
};

export const createNewTopicClusters = (numberOfClusters) => {
  return post(BIGQUERY_URL + "/create-topic-clusters", null, {
    numberOfClusters,
  });
};

export const getClusterCount = () => {
  return get(BIGQUERY_URL + "/get-cluster-count");
};
