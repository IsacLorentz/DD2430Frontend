const services = require("../services");

async function getData(req, res, next) {
  try {
    res.json(await services.getData());
  } catch (err) {
    console.error(`Error while getting data`, err.message);
    next(err);
  }
}

async function getSentimentOverTime(req, res, next) {
  try {
    res.json(await services.getSentimentOverTime(req.query));
  } catch (err) {
    console.error(`Error while getting data`, err.message);
    next(err);
  }
}

async function createNewTopicClusters(req, res, next) {
  try {
    res.json(await services.createNewTopicClusters(req.query));
  } catch (err) {
    console.error(`Error while getting data`, err.message);
    next(err);
  }
}

async function getNumberOfClusters(req, res, next) {
  try {
    res.json(await services.getNumberOfClusters());
  } catch (err) {
    console.error(`Error while getting data`, err.message);
    next(err);
  }
}

module.exports = {
  getData,
  getSentimentOverTime,
  createNewTopicClusters,
  getNumberOfClusters,
};
