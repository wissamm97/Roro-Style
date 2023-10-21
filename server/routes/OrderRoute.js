const express = require("express");

const orderRouter = express.Router();
const orderController = require("../controller/orderController");
const { protact } = require("../middleware/authMiddleware");
orderRouter.post("/", protact, orderController.addOrder);
orderRouter.get("/mine", protact, orderController.getOrderList);
orderRouter.get("/:id", protact, orderController.getOrder);
orderRouter.put("/pay/:id", protact, orderController.ApproveOrder);

module.exports = orderRouter;
