const express = require("express");
const router = express.Router();
const controller = require("../controller");

/* GET */
router.get("/data", controller.getData);
router.get("/sentiment-over-time", controller.getSentimentOverTime);
router.get("/occurences-over-time", controller.getOccurencesOverTime);
router.get("/get-cluster-count", controller.getNumberOfClusters);

/* POST */
router.post("/create-topic-clusters", controller.createNewTopicClusters);

module.exports = router;
