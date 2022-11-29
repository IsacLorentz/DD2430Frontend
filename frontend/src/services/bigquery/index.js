import { get } from "@/api";
import { BIGQUERY_URL } from "@/config";

export const getData = () => {
  return get(BIGQUERY_URL + "/data");
};
