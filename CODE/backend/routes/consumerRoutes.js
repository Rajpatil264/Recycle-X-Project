const express = require("express");
const {
  registerConsumer,
  loginConsumer,
  updateConsumer,
} = require("../controllers/consumerController");
const router = express.Router();

// Request to Controller
router.post("/signUp", registerConsumer);
router.post("/signIn", loginConsumer);
router.put("/update/:id", updateConsumer);
router.put("/addcart/:id", updateConsumer);

module.exports = router;
