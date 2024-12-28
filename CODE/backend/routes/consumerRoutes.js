const express = require("express");
const {
  registerConsumer,
  loginConsumer,
  updateConsumer,
  addToCart,
} = require("../controllers/consumerController");
const router = express.Router();

// Request to Controller
router.post("/signUp", registerConsumer);
router.post("/signIn", loginConsumer);
router.put("/update/:id", updateConsumer);
router.post("/addtocart/:id", addToCart);

module.exports = router;
