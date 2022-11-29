const express = require("express");
const router = express.Router();
const controller = require("../controller");

/* GET */
router.get("/data", controller.get);

module.exports = router;
