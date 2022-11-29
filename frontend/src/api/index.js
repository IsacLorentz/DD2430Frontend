import axios from "axios";

export const get = async (url, queryParams, headers) =>
  await makeApiCall(url, "get", null, queryParams, headers);

export const post = async (url, data, queryParams, headers) =>
  await makeApiCall(url, "post", data, queryParams, headers);

export const put = async (url, data, queryParams, headers) =>
  await makeApiCall(url, "put", data, queryParams, headers);

export const patch = async (url, data, queryParams, headers) =>
  await makeApiCall(url, "patch", data, queryParams, headers);

export const remove = async (url, data, queryParams, headers) =>
  await makeApiCall(url, "delete", data, queryParams, headers);

async function makeApiCall(url, method, data, queryParams, headers) {
  const response = await axios.request({
    method: method,
    url: url,
    data: data,
    params: queryParams,
    headers: headers,
  });

  return response.data;
}
