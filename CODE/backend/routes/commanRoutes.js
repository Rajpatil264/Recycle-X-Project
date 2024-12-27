const express = require("express");
const router = express.Router();
const {
  getAllServiceZones,
  findServiceByPincode,
} = require("../controllers/commonController");

// Request to Controller
router.get("/getServiceZones", getAllServiceZones);
router.post("/findServiceByPincode", findServiceByPincode);

module.exports = router;
