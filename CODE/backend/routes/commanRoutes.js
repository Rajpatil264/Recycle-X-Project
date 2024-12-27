const express = require("express");
const router = express.Router();
const { getAllServiceZones } = require("../controllers/commonController");

router.get("/", getAllServiceZones());

module.exports = router;
