const express = require("express");
const router = express.Router();
const { getAllServiceZones } = require("../controllers/commonController");

// Request to Controller
router.get("/", getAllServiceZones);

module.exports = router;
