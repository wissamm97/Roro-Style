const express = require("express");
const PaymentRouter = express.Router();
const PaymentController = require("../controller/PaymentController");
const { protact } = require("../middleware/authMiddleware");

PaymentRouter.get("/:id/payment/success", protact, PaymentController.successPaid);
PaymentRouter.post("/checkout", protact, PaymentController.checkout);

module.exports = PaymentRouter;
