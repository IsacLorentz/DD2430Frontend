const express = require("express");
const router = express.Router();
const controller = require("../controller");

/* GET */
router.get("/data", controller.getData);
router.get("/trends-over-time", controller.getTrendsOverTime);
router.get("/get-cluster-count", controller.getNumberOfClusters);

/* POST */
router.post("/create-topic-clusters", controller.createNewTopicClusters);

module.exports = router;
